<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="!isEditing ? 'Create Loan' : 'Edit Loan'"
    :style="{ width: '50vw' }"
    @hide="handleHide"
  >
    <Message
      v-if="isReleased"
      severity="warn"
      class="mt-0"
      ><strong>Warning</strong> You are about to edit a released loan.</Message
    >
    <template v-if="loadings.fetching">
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
    <LoanApplicationForm
      v-else
      v-model="model.form"
      :disable-member="disableMember"
      :has-savings="hasSavings"
      :has-share-cap="hasShareCap"
      @member-change="handleMemberChange"
    />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Save as Draft"
        icon="pi pi-save"
        severity="warning"
        :loading="loadings.save"
        @click="handleSaveClick(true)"
        autofocus
      />
      <Button
        label="Submit"
        icon="pi pi-save"
        :loading="loadings.save"
        @click="handleSaveClick(false)"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import LoanApplicationForm from './LoanApplicationForm.vue';
import type { Member } from '@/types/ui/members';
import Button from 'primevue/button';
import type { LoanForm } from '@/types/ui/loans';
import { mapLoanFormToPayload, mapLoanToLoanForm } from '@/constants/mapping/loans';
import LoanService from '@/service/LoanService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import Skeleton from 'primevue/skeleton';
import useValidation from '@/composables/useValidation';
import Message from 'primevue/message';
import type { DropdownOption } from '@/types/ui';
import MembersService from '@/service/MembersService';

interface Props {
  visible: boolean;
  member?: Member;
  disableMember?: boolean;
  loanIdForEdit?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'saved']);
const { showApiError, showSuccess, showError } = useAlert();

const { validation } = useValidation();
const model = reactive<{ form?: LoanForm }>({
  form: {},
});

const isReleased = ref(false);

const isEditing = computed(() => !!props.loanIdForEdit);
const showModal = ref(false);
const loadings = ref({
  save: false,
  fetching: false,
});
const hasSavings = ref(false);
const hasShareCap = ref(false);

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
    if (value && props.member) setMember(props.member);
  }
);

// watch(
//   () => props.member,
//   (value) => {
//     if (value) setMember(value);
//   },
//   {
//     deep: true,
//   }
// );

watch(showModal, (value) => {
  if (value && isEditing.value) loadLoan();
});

const setMember = (member?: Member) => {
  model.form!.member_id = member?.id?.toString();
  model.form!.email = member?.email_address?.toString();
  model.form!.contact_number = member?.mobile_number?.toString();
  model.form!.tin_number = member?.tin_no?.toString();
  model.form!.civil_status = member?.civil_status?.toString();
  model.form!.home_address = member?.full_permanent_address?.toString();
  model.form!.present_address = member?.full_present_address?.toString();
  model.form!.age = member?.age;
  setFeeDisables(member);
};

const setFeeDisables = (member?: Member) => {
  console.log(member);
  hasSavings.value = !!member?.savings_accounts.find((r) => r.is_holder_member);
  hasShareCap.value = !!member?.share_capital_account;
};

const handleSaveClick = async (draft: boolean) => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }

  try {
    loadings.value.save = true;
    if (isEditing.value)
      await LoanService.update(props.loanIdForEdit ?? 0, {
        ...mapLoanFormToPayload(model.form!),
        is_draft: draft,
      });
    else
      await LoanService.postLoan({
        ...mapLoanFormToPayload(model.form!),
        is_draft: draft,
      });

    showSuccess('Loan application saved successfully.');
    showModal.value = false;
    emit('saved');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const loadLoan = async () => {
  loadings.value.fetching = true;
  try {
    const { data } = await LoanService.show(props.loanIdForEdit ?? 0);
    model.form = mapLoanToLoanForm(data);
    isReleased.value = data.released ?? false;
    setFeeDisables(data.member);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};

const handleHide = () => {
  model.form = {};
  validation.value?.$reset();
  isReleased.value = false;
};

const handleMemberChange = async (value: DropdownOption) => {
  try {
    const { data } = await MembersService.show(value.value);
    setMember(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
};
</script>
