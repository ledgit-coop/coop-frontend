import ReleaseLoan from './ReleaseLoan.vue';
<template>
  <div class="flex gap-2">
    <Button
      icon="pi pi-eye"
      v-tooltip="'View'"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleViewLoanClick()"
    />

    <Button
      icon="pi pi-trash"
      v-tooltip="'Delete'"
      severity="danger"
      @click="handleDeleteClick"
      text
      v-if="!loan?.released"
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
    />

    <Button
      icon="pi pi-pencil"
      v-tooltip="'Edit'"
      severity="warning"
      v-if="loan?.status !== MemberLoanStatus.APPROVED && !loan?.released"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleEditLoanClick()"
    />

    <Button
      v-if="[MemberLoanStatus.PENDING,MemberLoanStatus.EVAULUATION, MemberLoanStatus.PRE_APPROVED].includes(loan?.status as MemberLoanStatus)"
      icon="pi pi-thumbs-down-fill"
      v-tooltip="'Reject'"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      severity="danger"
      @click="handleViewLoanClick()"
    />

    <Button
      v-if="loan?.status === MemberLoanStatus.PENDING"
      v-tooltip="'Start Evaluation'"
      icon="pi pi-play"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleChangeStatus(MemberLoanStatus.EVAULUATION)"
    />

    <Button
      v-if="loan?.status === MemberLoanStatus.EVAULUATION"
      v-tooltip="'Pre-Approved'"
      icon="pi pi-check"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleChangeStatus(MemberLoanStatus.PRE_APPROVED)"
    />

    <Button
      v-if="loan?.status === MemberLoanStatus.PRE_APPROVED"
      icon="pi pi-thumbs-up-fill"
      v-tooltip="'Approved'"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleChangeStatus(MemberLoanStatus.APPROVED)"
    />

    <Button
      v-if="loan?.status === MemberLoanStatus.APPROVED"
      icon="pi pi-send"
      v-tooltip="'Release'"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="modalsVisibility.release = true"
    />
  </div>

  <LoanView
    v-model:visible="modalsVisibility.view_loan"
    :loan-id="loan?.id"
  />

  <LoanSave
    v-model:visible="modalsVisibility.edit_loan"
    :loan-id-for-edit="loan?.id"
    @saved="emit('updated')"
  />

  <ReleaseLoan
    v-model:visible="modalsVisibility.release"
    :loan="loan"
    @updated="emit('updated')"
  />
</template>
<script setup lang="ts">
import type { Loan } from '@/types/ui/loans';
import { ref } from 'vue';
import LoanView from './LoanView.vue';
import { MemberLoanStatus } from '@/constants/ui/members';
import Button from 'primevue/button';
import LoanSave from './LoanSave.vue';
import { useConfirm } from 'primevue/useconfirm';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import LoanService from '@/service/LoanService';
import ReleaseLoan from './ReleaseLoan.vue';

interface Props {
  loan?: Loan;
}

const modalsVisibility = ref({
  view_loan: false,
  edit_loan: false,
  release: false,
});
const confirm = useConfirm();

const { showSuccess, showApiError } = useAlert();

const props = defineProps<Props>();
const emit = defineEmits(['updated']);

const handleViewLoanClick = () => {
  modalsVisibility.value.view_loan = true;
};

const handleEditLoanClick = () => {
  modalsVisibility.value.edit_loan = true;
};

const handleDeleteClick = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Loan',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await LoanService.destroy(props.loan?.id ?? 0);
        showSuccess('Loan successfully added.');
        emit('updated');
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const handleChangeStatus = (status: MemberLoanStatus) => {
  let message = 'Are you sure you want to proceed?';
  switch (status) {
    case MemberLoanStatus.EVAULUATION:
      message = 'Do you want to start the evaluation?';
      break;
    case MemberLoanStatus.PRE_APPROVED:
      message = 'Do you want to update the to pre-approved?';
      break;

    case MemberLoanStatus.REJECTED:
      message = 'Do you want to reject?';
      break;
    case MemberLoanStatus.APPROVED:
      message = 'Do you want to approve the loan?';
      break;
    case MemberLoanStatus.RELEASED:
      message = 'Do you want to release the loan?';
      break;
  }
  confirm.require({
    message,
    header: `Update Status`,
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      updateStatus(status);
    },
  });
};

const updateStatus = async (status: MemberLoanStatus) => {
  try {
    await LoanService.updateStatus(props.loan?.id.toString() ?? '', status);
    showSuccess('Loan successfully added.');
    emit('updated');
  } catch (error) {
    showApiError(error as AxiosError);
  }
};
</script>
