<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Loan Application"
    :style="{ width: '50vw' }"
  >
    <LoanApplicationForm
      v-model="model"
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
        @click="handleSaveClick"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import LoanApplicationForm from './LoanApplicationForm.vue';
import type { Member } from '@/types/ui/members';
import Button from 'primevue/button';
import type { LoanForm } from '@/types/ui/loans';
import { mapLoanFormToPayload } from '@/constants/mapping/loans';
import LoanService from '@/service/LoanService';

interface Props {
  visible: boolean;
  member?: Member;
  disableMember?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<LoanForm>({
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
  status: 'Pending',
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
});
const showModal = ref(false);

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

const setMemberId = () => {
  console.log(props.member);
  model.member_id = props.member?.id;
};

const handleSaveClick = () => {
  LoanService.postLoan(mapLoanFormToPayload(model));
};
</script>
