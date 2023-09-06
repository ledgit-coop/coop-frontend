<template>
  <MembersSavingsAccountWidget
    v-if="accounts.length > 1"
    :accounts="accounts"
  />

  <PageContentHeader
    class="mt-5"
    title="Transactions"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      optionLabel="label"
      placeholder="Select Account"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      optionLabel="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :value="transactions"
    tableStyle="min-width: 50rem"
  >
    <Column
      field="transaction_number"
      header="Transaction No."
    ></Column>
    <Column
      field="account"
      header="Account"
    ></Column>
    <Column
      field="date"
      header="Date"
    ></Column>
    <Column
      field="withdrawals"
      header="Withdrawals"
    ></Column>
    <Column
      field="deposits"
      header="Deposits"
    ></Column>
    <Column
      field="running_balance"
      header="Balance"
    ></Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Ending Balance:"
          :colspan="5"
          footerStyle="text-align:right"
        />
        <Column footer="1,100.00" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { onMounted, ref } from 'vue';
import type { MemberSavingsAccountWidgetItem, MemberAccountTransactionHistory } from '@/types/ui/members';
import MembersSavingsAccountWidget from './MembersSavingsAccountWidget.vue';
import PageContentHeader from '@/views/components/PageContentHeader.vue';
import MembersService from '@/service/MembersService';

const transactions = ref<MemberAccountTransactionHistory[]>();
const accounts = ref<MemberSavingsAccountWidgetItem[]>([
  {
    type: 'Regular Savings',
    balance: 202040.2,
    currency: 'Php',
    last_deposit_date: 'Sept 2, 2023',
    last_deposit_amount: 10000,
  },
  {
    type: 'Kiddie Savings',
    balance: 200000,
    currency: 'Php',
    last_deposit_date: 'Sept 2, 2023',
    last_deposit_amount: 2500,
  },
]);

onMounted(async () => {
  transactions.value = await MembersService.getMembersSavingsTransactionHistory('1');
});
</script>
