<template>
  <MembersSavingsAccountWidget
    v-if="accountsWidget.length"
    :accounts="accountsWidget"
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
      :loading="loadings.transaction_table"
      v-model="filters.member_account_id"
      :options="memberAccounts"
      @change="loadTransactions"
      placeholder="Select Account"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Year"
      @change="loadTransactions" 
      :options="yearOptions"  
    >
    </Dropdown>
  </PageContentHeader>

  <AccountTransactionsTable
    :loading="loadings.transaction_table"
    :transactions="transactions"
    :hide-columns="['particular']"
  />
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Member, MemberSavingsAccountWidgetItem } from '@/types/ui/members';
import type { AccountTransaction } from '@/types/ui/accounts';

import MembersSavingsAccountWidget from './MembersSavingsAccountWidget.vue';
import PageContentHeader from '@components/PageContentHeader.vue';
import AccountTransactionsTable from '@components/AccountTransactionsTable.vue';
import MembersService from '@/service/MembersService';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import type { AxiosError } from 'axios';
import useAlert from '@/composables/useAlert';
import { dateFormat, generateYearListDropdown } from '@/helpers';
import { DATE_FORMAT_DATE } from '@/constants';
import { AccountType } from '@/constants/ui/accounts';

interface Props {
  member?: Member;
}

const props = defineProps<Props>();
const yearOptions = computed(() => generateYearListDropdown());

const filters = ref({
  member_account_id: '',
  year: '',
});
const { showApiError } = useAlert();
const loadings = ref({
  member_accounts: false,
  transaction_table: false,
});
const memberAccounts = ref<DropdownOption[]>([]);

const accountsWidget = computed<MemberSavingsAccountWidgetItem[]>(()=> [
  ...props.member?.savings_accounts?.map(savings=>({
    type: savings.name ?? '',
    balance: savings.balance ?? 0,
    last_deposit_date: dateFormat(savings.latest_transaction?.transaction_date ?? null, DATE_FORMAT_DATE),
    last_deposit_amount: savings.latest_transaction?.amount  ?? 0,
    interest_per_anum: savings.interest_per_anum,
  })) ?? [],
]);

const transactions = ref<AccountTransaction[]>();

watch(
  () => props.member?.id,
  (value) => {
    if (value) {
      loadAccountDropdown();
      loadTransactions();
    }
  }
);

const loadAccountDropdown = async () => {
  try {
    loadings.value.member_accounts = true;
    const { data } = await UtilityService.getmemberAcountDropdown(props.member?.id ?? '');
    memberAccounts.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.member_accounts = false;
};

const loadTransactions = async () => {
  try {
    loadings.value.transaction_table = true;
    const { data } = await MembersService.getMemberAccountTrasactions(props.member?.id ?? '',  {
      type:  AccountType.SAVINGS,
      member_account_id: filters.value.member_account_id,
      year: filters.value.year,
    });
    transactions.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.transaction_table = false;
};
</script>
