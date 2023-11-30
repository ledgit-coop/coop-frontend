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
          :show-member-number="isEditing"
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
            @click="handleSubmit(isEditing ? false : true)"
          ></Button>
        </div>

        <Dialog
          v-model:visible="modal.show_save_dialog"
          modal
          header="Save New Member"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <div class="formgrid">
            <div class="flex align-items-center pt-3">
              <Checkbox
                inputId="oriented"
                name="oriented"
                binary
                v-model="model.form.oriented"
              />
              <label
                for="ingredient1"
                class="ml-2"
              >
                Done PMES?
              </label>
            </div>
            <template v-if="model.form.oriented">
              <div class="ml-3">
                <p class="p-0 m-0 pt-3 pb-2 col-12">
                  Do you want to record that the member is already paid the orientation fee?
                </p>

                <div class="flex flex-wrap gap-3">
                  <div class="flex align-items-center">
                    <RadioButton
                      input-id="record-orientation-fee"
                      name="record_orientation_fee"
                      :value="true"
                      :disabled="!model.form.oriented"
                      v-model="model.form.record_orientation_fee"
                    />
                    <label
                      inputId="record-orientation-fee"
                      class="ml-2"
                      >Yes Record</label
                    >
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton
                      input-id="record-orientation-fee"
                      name="record_orientation_fee"
                      :value="false"
                      :disabled="!model.form.oriented"
                      v-model="model.form.record_orientation_fee"
                    />
                    <Label
                      help-text="By selecting this means the orientation payment is already recorded separately."
                      inputId="record-orientation-fee"
                      class="ml-2"
                      >No Don't Record</Label
                    >
                  </div>

                  <div class="col-12 p-0">
                    <FieldErrorMessage
                      :validation="validation"
                      field="record_orientation_fee"
                    />
                  </div>
                </div>

                <div
                  class="col-6 ml-0 pl-0"
                  v-if="model.form.record_orientation_fee"
                >
                  <div class="field flex flex-column">
                    <Label
                      required
                      for="orientation-fee-amount"
                      >Orientation Fee</Label
                    >

                    <InputNumber
                      :minFractionDigits="2"
                      :maxFractionDigits="3"
                      id="orientation-fee-amount"
                      mode="currency"
                      currency="PHP"
                      input-id="locale-user"
                      v-model="model.form.orientation_fee_amount"
                      validate="orientation_fee_amount"
                      v-validation="validation"
                    />
                    <FieldErrorMessage
                      :validation="validation"
                      field="orientation_fee_amount"
                    />
                  </div>

                  <div class="field flex flex-column">
                    <Label
                      required
                      for="transaction-date"
                      >Orientation Date</Label
                    >
                    <Calendar
                      date-format="yy-mm-dd"
                      id="orientation-date"
                      v-model="model.form.orientation_date"
                      mask="true"
                      :max-date="new Date()"
                      showButtonBar
                      validate="orientation_date"
                      v-validation="validation"
                    />
                    <FieldErrorMessage
                      :validation="validation"
                      field="orientation_date"
                    />
                  </div>
                </div>
              </div>
            </template>

            <div class="flex align-items-center pt-3">
              <Checkbox
                inputId="paid-membership"
                name="paid-membership"
                binary
                v-model="model.form.paid_membership"
              />
              <label
                for="ingredient1"
                class="ml-2"
              >
                Already paid membership?
              </label>
            </div>
            <template v-if="model.form.paid_membership">
              <div class="ml-3">
                <p class="p-0 m-0 pt-3 pb-2 col-12">
                  Do you want to record that the member is already paid the membership fee?
                </p>

                <div class="flex flex-wrap gap-3">
                  <div class="flex align-items-center">
                    <RadioButton
                      input-id="record-membership-fee"
                      name="record_membership_payment"
                      :value="true"
                      :disabled="!model.form.paid_membership"
                      v-model="model.form.record_membership_payment"
                    />
                    <label
                      inputId="record-membership-fee"
                      class="ml-2"
                      >Yes Record</label
                    >
                  </div>
                  <div class="flex align-items-center">
                    <RadioButton
                      input-id="record-membership-fee"
                      name="record_membership_payment"
                      :value="false"
                      :disabled="!model.form.paid_membership"
                      v-model="model.form.record_membership_payment"
                    />
                    <Label
                      help-text="By selecting this means the membership payment is already recorded separately."
                      inputId="record-membership-fee"
                      class="ml-2"
                      >No Don't Record</Label
                    >
                  </div>

                  <div class="col-12 p-0">
                    <FieldErrorMessage
                      :validation="validation"
                      field="record_membership_payment"
                    />
                  </div>
                </div>

                <div
                  class="col-6 ml-0 pl-0"
                  v-if="model.form.record_membership_payment"
                >
                  <div class="field flex flex-column">
                    <Label
                      required
                      for="membership-fee-amount"
                      >Membership Fee</Label
                    >
                    <InputNumber
                      :minFractionDigits="2"
                      :maxFractionDigits="3"
                      id="membership-fee-amount"
                      mode="currency"
                      currency="PHP"
                      input-id="locale-user"
                      validate="membership_fee_amount"
                      v-validation="validation"
                      v-model="model.form.membership_fee_amount"
                    />

                    <FieldErrorMessage
                      :validation="validation"
                      field="membership_fee_amount"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              text
              @click="modal.show_save_dialog = false"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              autofocus
              :loading="loadings.saving"
              @click="handleSubmit()"
            />
          </template>
        </Dialog>
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
import { mapMemberFormToPostMemberPayload, mapMemberToMemberForm } from '@/constants/mapping/members';
import type { AxiosError } from 'axios';
import { useRoute } from 'vue-router';
import type { Member } from '@/types/ui/members';
import Dialog from 'primevue/dialog';
import Label from '@/components/Label.vue';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import { requiredIf } from '@vuelidate/validators';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';

const { showApiError, showError, showSuccess } = useAlert();
const loadings = ref({
  saving: false,
  fetching: false,
});
const model = reactive<{ form: MemberForm }>({
  form: {
    beneficiaries: [],
    spouse: {},
    mother: {},
    father: {},
  },
});
const modal = ref({
  show_save_dialog: false,
});
const member = ref<Member>();
const route = useRoute();

const member_id = computed(() => (route.params.id ?? '').toString());
const isEditing = computed(() => (member_id.value ? true : false));

const form = computed(() => model.form);
const rules = computed(() => ({
  record_membership_payment: {
    requiredIf: requiredIf((form.value.paid_membership ?? false) && !isEditing.value),
  },
  record_orientation_fee: {
    requiredIf: requiredIf((form.value.oriented ?? false) && !isEditing.value),
  },
  membership_fee_amount: {
    requiredIf: requiredIf((form.value.record_membership_payment ?? false) && !isEditing.value),
  },
  orientation_fee_amount: {
    requiredIf: requiredIf((form.value.record_orientation_fee ?? false) && !isEditing.value),
  },
  orientation_date: {
    requiredIf: requiredIf((form.value.record_orientation_fee ?? false) && !isEditing.value),
  },
}));
const { validation } = useValidation({
  rules,
  model: form,
});

onMounted(() => {
  if (isEditing.value) loadInformation();
});

const handleSubmit = async (showSaveDialog: boolean = false) => {
  if (showSaveDialog) {
    modal.value.show_save_dialog = true;
    return;
  }
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

      if (isEditing.value) {
        loadings.value.saving = false;
        showSuccess('Member successfully updated.');
      } else showSuccess('Member successfully added.');

      setTimeout(() => {
        router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: data.id } });
      }, 2000);
    } catch (error) {
      showApiError(error as AxiosError);
      loadings.value.saving = false;
    }
  }
};

const loadInformation = async () => {
  loadings.value.fetching = true;

  try {
    const { data } = await MembersService.show(member_id.value);
    member.value = data;
    model.form = mapMemberToMemberForm(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};

const handleBackClick = () => {
  if (isEditing.value) router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: member.value?.id } });
  else router.push({ name: ROUTE_NAME_MEMBERS });
};
</script>
