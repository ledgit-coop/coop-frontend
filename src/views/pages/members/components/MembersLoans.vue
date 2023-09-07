<template>
  <PageContentHeader
    class="mt-5"
    title="Active Loans"
    size="h5"
  >
  </PageContentHeader>

  <MembersLoanWidget
    v-if="loans.length > 1"
    :loans="loans"
  />

  <PageContentHeader
    class="mt-5"
    title="History"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select Loan"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <MemberLoansTable
    :hide-columns="['member']"
    :model-value="history"
  >
    <template #action="slotProps">
      <div class="flex flex-wrap gap-2">
        <Button
          label="View"
          icon="pi pi-eye"
          class="p-button-raised mr-2 mb-2"
          size="small"
          @click="handleViewLoanClick(slotProps.data)"
        />
      </div>
    </template>
  </MemberLoansTable>

  <MembersLoanView
    v-model:visible="modalsVisibility.view_loan"
    :loan_id="selected_history?.id"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MembersLoanWidget from './MembersLoanWidget.vue';
import type { MemberLoanWidgetItem, MemberLoanTable } from '@/types/ui/members';
import MembersService from '@/service/MembersService';
import PageContentHeader from '@components/PageContentHeader.vue';
import MemberLoansTable from '@components/MemberLoansTable.vue';
import MembersLoanView from '@components/MembersLoanView.vue';
import Button from 'primevue/button';

interface ModalsVisibility {
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  view_loan: false,
});

const history = ref<MemberLoanTable[]>();
const selected_history = ref<MemberLoanTable | undefined>();
const loans = ref<MemberLoanWidgetItem[]>([
  {
    type: 'Salary Loan',

    balance: 202040.2,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
  {
    type: 'Emergency Loan',

    balance: 200000,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
]);

onMounted(async () => {
  history.value = await MembersService.getMemberLoanHistory('12');
});

const handleViewLoanClick = (value: MemberLoanTable) => {
  selected_history.value = value;
  modalsVisibility.value.view_loan = true;
};
</script>
