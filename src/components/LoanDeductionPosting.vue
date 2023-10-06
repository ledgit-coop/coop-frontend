<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Loan Deductions"
    :style="{ width: '40vw' }"
  >
    <DataTable
      :value="deductions"
      table-style="min-width: 50rem"
      ref="table"
      export-filename="account-transactions"
    >
      <Column
        field="name"
        header="Fee"
      ></Column>
      <Column
        field="amount"
        header="Amount"
      ></Column>

      <Column
        field="amount"
        header="Options"
      ></Column>

      <Column
        field="amount"
        header="Actions"
      ></Column>

      <template #empty> No records found. </template>
    </DataTable>

    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import type { Loan } from '@/types/ui/loans';
import LoanService from '@/service/LoanService';
import { MemberLoanStatus } from '@/constants/ui/members';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';

interface Props {
  visible: boolean;
  loan?: Loan;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const showModal = ref(false);
const confirm = useConfirm();
const approvedAmount = ref();
const deductions = ref([
  { name: 'PRocessing', amount: 0 },
  { name: 'PRocessing', amount: 0 },
  { name: 'PRocessing', amount: 0 },
  { name: 'PRocessing', amount: 0 },
]);

const form = computed(() => ({
  approved_amount: approvedAmount.value,
}));

const { validation } = useValidation({
  rules: {
    approved_amount: { required },
  },
  model: form,
});

const { showApiError, showSuccess, showError } = useAlert();

const loadings = ref({
  saving: false,
});

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
  }
);

const handleClickApprove = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  if (loadings.value.saving) return;
  try {
    confirm.require({
      message: 'Do you sure you want to proceed?',
      header: 'Approve Loan',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        loadings.value.saving = true;

        try {
          await LoanService.updateStatus(props.loan?.id.toString() ?? '', MemberLoanStatus.APPROVED, {
            approved_amount: approvedAmount.value,
          });
          showSuccess('Loan successfully added.');
          emit('updated');
        } catch (error) {
          showApiError(error as AxiosError);
        }

        loadings.value.saving = false;
        showModal.value = false;
      },
    });
  } catch (error) {
    showApiError(error as AxiosError);
  }
};
</script>
