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
      icon="pi pi-pencil"
      v-tooltip="'Edit'"
      severity="warning"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleEditLoanClick()"
    />


    <Button
      icon="pi pi-trash"
      v-tooltip="'Edit'"
      severity="danger"
      text
      v-if="!loan?.releasing_date"
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
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
      v-tooltip="'Pre-Approved'"
      icon="pi pi-check"
      text
      raised
      rounded
      class="mr-2 mb-2"
      size="small"
      @click="handleViewLoanClick()"
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
      @click="handleViewLoanClick()"
    />
  </div>

  <LoanView
    v-model:visible="modalsVisibility.view_loan"
    :loan="loan"
  />

  <LoanSave
    v-model:visible="modalsVisibility.edit_loan"
    :loan-id-for-edit="loan?.id"
    @saved="emit('updated')"
  />
</template>
<script setup lang="ts">
import type { Loan } from '@/types/ui/loans';
import { ref } from 'vue';
import LoanView from './LoanView.vue';
import { MemberLoanStatus } from '@/constants/ui/members';
import Button from 'primevue/button';
import LoanSave from './LoanSave.vue';

interface Props {
  loan?: Loan;
}

const modalsVisibility = ref({
  view_loan: false,
  edit_loan: false,
});

defineProps<Props>();
const emit = defineEmits(['updated']);

const handleViewLoanClick = () => {
  modalsVisibility.value.view_loan = true;
};

const handleEditLoanClick = () => {
  modalsVisibility.value.edit_loan = true;
};
</script>
