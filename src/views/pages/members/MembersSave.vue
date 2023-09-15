<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader :title="isEditing ? 'Edit Member' : 'Add New Member'">
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            @click="handleBackClick"
          ></Button>
        </PageContentHeader>

        <MembersForm
          v-if="!loadings.fetching"
          v-model="model.form"
        />
        <template v-else>
          <Skeleton class="mb-2 full-width"></Skeleton>
          <Skeleton class="mb-2 full-width"></Skeleton> <Skeleton class="mb-2 full-width"></Skeleton>
          <Skeleton class="mb-2 full-width"></Skeleton> <Skeleton class="mb-2 full-width"></Skeleton>
          <Skeleton
            height="150px"
            class="mb-2 full-width"
          ></Skeleton>

          <Skeleton
            height="150px"
            class="mb-2 full-width"
          ></Skeleton>

          <Skeleton
            height="20px"
            class="mb-2 full-width"
          ></Skeleton>
        </template>

        <div class="flex">
          <Button
            icon="pi pi-save"
            label="Save"
            :loading="loadings.saving"
            class="ml-auto"
            @click="handleSubmit"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTE_NAME_MEMBERS, ROUTE_NAME_MEMBERS_VIEW } from '@/constants/routes';
import Button from 'primevue/button';
import router from '@/router';
import MembersForm from './components/MembersForm.vue';
import PageContentHeader from '@components/PageContentHeader.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { MemberForm } from '@/types/ui/members';
import useValidation from '@/composables/useValidation';
import useAlert from '@/composables/useAlert';
import MembersService from '@/service/MembersService';
import { mapMemberFormToPostMemberPayload } from '@/constants/mapping/members';
import type { AxiosError } from 'axios';
import { useRoute } from 'vue-router';
import type { Member } from '@/types/ui/members';
import { TEST_MEMBER_FORM } from '@/constants/tests/members';

const { showApiError, showError, showSuccess } = useAlert();
const loadings = ref({
  saving: false,
  fetching: false,
});
const model = reactive<{ form: MemberForm }>({
  // form: {
  //   beneficiaries: [],
  //   spouse: {},
  //   mother: {},
  //   father: {},
  // },
  form: TEST_MEMBER_FORM,
});
const member = ref<Member>();
const route = useRoute();

const member_id = computed(() => (route.params.id ?? '').toString());
const isEditing = computed(() => (member_id.value ? true : false));

const { validation } = useValidation();

onMounted(() => {
  if (isEditing.value) loadInformation();
});

const handleSubmit = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete required fields.');
    return;
  }

  if (!loadings.value.saving) {
    loadings.value.saving = true;

    try {
      let response: any;
      if (isEditing.value)
        response = await MembersService.patchMembers(
          member.value?.id ?? '',
          mapMemberFormToPostMemberPayload(model.form)
        );
      else response = await MembersService.postMembers(mapMemberFormToPostMemberPayload(model.form));

      const { data } = response;

      if (isEditing.value) showSuccess('Member successfully updated.');
      else showSuccess('Member successfully added.');

      setTimeout(() => {
        router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: data.member_number } });
      }, 2000);
    } catch (error) {
      showApiError(error as AxiosError);
    }
    loadings.value.saving = false;
  }
};

const loadInformation = async () => {
  loadings.value.fetching = true;

  try {
    const { data } = await MembersService.show(member_id.value);
    member.value = data;
    model.form = {
      ...model.form,
      ...data,
    };
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};

const handleBackClick = () => {
  if (isEditing.value) router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: member.value?.member_number } });
  else router.push({ name: ROUTE_NAME_MEMBERS });
};
</script>
