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
      option-label="label"
      placeholder="Select Account"
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

  <AccountTransactionsTable
    :transactions="transactions"
    :hide-columns="['particular']"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { MemberSavingsAccountWidgetItem } from '@/types/ui/members';
import type { AccountTransactionHistory } from '@/types/ui/accounts';

import MembersSavingsAccountWidget from './MembersSavingsAccountWidget.vue';
import PageContentHeader from '@components/PageContentHeader.vue';
import AccountTransactionsTable from '@components/AccountTransactionsTable.vue';
import MembersService from '@/service/MembersService';

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

const transactions = ref<AccountTransactionHistory[]>();

onMounted(async () => {
  transactions.value = await MembersService.getMembersSavingsTransactionHistory('1');
});
</script>
