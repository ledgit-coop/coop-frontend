<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Add New Member">
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            @click="router.push({ name: ROUTE_NAME_MEMBERS })"
          ></Button>
        </PageContentHeader>
        <MembersForm v-model="model" />

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
import { reactive, ref } from 'vue';
import type { MemberForm } from '@/types/ui/members';
import useValidation from '@/composables/useValidation';
import useAlert from '@/composables/useAlert';
import MembersService from '@/service/MembersService';
import { mapMemberFormToPostMemberPayload } from '@/constants/mapping/members';
import { TEST_MEMBER_FORM } from '@/constants/tests/members';
import type { AxiosError } from 'axios';

const { showApiError, showSuccess } = useAlert();
const loadings = ref({
  saving: false,
});
const model = reactive<MemberForm>(TEST_MEMBER_FORM);
// const model = reactive<MemberForm>({
//   father: {},
//   mother: {},
//   spouse: {},
//   beneficiaries: [
//     {
//       name: '',
//       birthdate: undefined,
//       relationship: '',
//     },
//   ],
// });

const { validation } = useValidation();

const handleSubmit = async () => {
  // @ts-ignore
  console.log(validation.value);
  // const valid = await validation.value?.$validate();
  // if (!valid) showError('Please complete required fields.');

  if (!loadings.value.saving) {
    loadings.value.saving = true;

    try {
      const { data } = await MembersService.postMembers(mapMemberFormToPostMemberPayload(model));

      showSuccess('Member successfully added.');
      setTimeout(() => {
        router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: data.member_number } });
      }, 2000);
    } catch (error) {
      loadings.value.saving = false;
      showApiError(error as AxiosError);
    }
  }
};
</script>
