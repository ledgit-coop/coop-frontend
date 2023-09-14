<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="!isEditing ? 'Create Loan' : 'Edit Loan'"
    :style="{ width: '50vw' }"
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
    />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Submit"
        icon="pi pi-save"
        :loading="loadings.save"
        @click="handleSaveClick"
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

interface Props {
  visible: boolean;
  member?: Member;
  disableMember?: boolean;
  loanIdForEdit?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'saved']);
const { showApiError, showSuccess } = useAlert();

const model = reactive<{ form?: LoanForm }>({
  form: {
    member_id: '1',
    contact_number: '555-555-5555',
    age: 35,
    civil_status: 'Married',
    present_address: '123 Main Street',
    home_address: '456 Elm Avenue',
    email: 'example@example.com',
    valid_id: 'ABCD1234',
    tin_number: '987654321',
    number_of_children: 2,
    application_type: 'new',
    employer_name: 'ABC Company',
    occupation: 'Software Developer',
    work_address: '789 Tech Road',
    loan_purpose: 'Home Improvement',
    comaker_first: 'John Doe',
    comaker_second: 'Jane Smith',
    salary_range: '31K-40K',
    work_industry: 'IT Software',
    member_account_id: 1,
    loan_product_id: 1,
    applied_amount: 15000.0,
    loan_term: {
      disbursed_channel: 'cash',
      interest_method: 'flat-rate',
      interest_type: 'percentage-base',
      loan_interest: 5.5,
      loan_interest_period: 'per-day',
      loan_duration: 12,
      loan_duration_type: 'months',
      repayment_cycle: 'daily',
      number_of_repayments: 12,
      repayment_mode: 'collections',
    },
  },
});

const isEditing = computed(() => !!props.loanIdForEdit);
const showModal = ref(false);
const loadings = ref({
  save: false,
  fetching: false,
});

onMounted(() => {
  setMemberId();
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

watch(
  () => props.member,
  () => {
    setMemberId();
  },
  {
    deep: true,
  }
);

watch(showModal, (value) => {
  if (value && isEditing.value) loadLoan();
});

const setMemberId = () => {
  model.form!.member_id = props.member?.id?.toString();
};

const handleSaveClick = async () => {
  try {
    loadings.value.save = true;
    if (isEditing.value) await LoanService.update(props.loanIdForEdit ?? 0, mapLoanFormToPayload(model.form!));
    else await LoanService.postLoan(mapLoanFormToPayload(model.form!));
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
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};
</script>
