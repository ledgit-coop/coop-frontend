<template>
  <PageContentHeader
    title="Accounts"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Status"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Opened Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :value="accounts"
    table-style="min-width: 50rem"
    scrollable
  >
    <Column
      field="account_number"
      header="Account No."
      sortable
    ></Column>
    <Column
      field="type"
      header="Type"
      sortable
    ></Column>
    <Column
      field="opened_date"
      header="Opened Date"
      sortable
    ></Column>
    <Column
      field="current_balance"
      header="Current Balance"
    ></Column>
    <Column
      field="passbook_count"
      header="Passbook(s)"
    ></Column>

    <Column
      field="status"
      sortable
      header="Status"
    >
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.status == AccountStatus.ACTIVE"
          severity="success"
          rounded
          value="Active"
        ></Tag>
        <Tag
          v-if="slotProps.data.status == AccountStatus.DORMANT"
          severity="danger"
          value="Dormant"
          rounded
        ></Tag>
      </template>
    </Column>

    <Column
      field="id"
      header="Action"
      align-frozen="right"
      style="min-width: 6rem; width: 6rem"
      frozen
    >
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <Button
            label="Transactions"
            icon="pi pi-eye"
            class="p-button-raised mr-2 mb-2"
            size="small"
            @click="handleViewTransactionClick(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="showModal"
    modal
    header="Transactions"
    :style="{ width: '50vw' }"
  >
    <PageContentHeader
      :title="selected_account?.type"
      size="h5"
    >
      <Calendar
        selection-mode="range"
        :manual-input="false"
        placeholder="Select a Date"
      />
    </PageContentHeader>

    <AccountTransactionsTable
      :loading="loadings.transaction_table"
      :transactions="selected_account_transactions"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { onMounted, ref, watch } from 'vue';
import type { Member, MemberLoanTable } from '@/types/ui/members';
import type { AccountTransaction } from '@/types/ui/accounts';

import AccountsService from '@/service/AccountsService';
import PageContentHeader from '@components/PageContentHeader.vue';
import Button from 'primevue/button';
import { AccountStatus } from '@/constants/ui/accounts';
import AccountTransactionsTable from '@components/AccountTransactionsTable.vue';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import MembersService from '@/service/MembersService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';

const showModal = ref(false);
const accounts = ref<MemberLoanTable[]>();
const selected_account = ref<undefined | MemberLoanTable>();

const selected_account_transactions = ref<AccountTransaction[]>();

interface Props {
  member?: Member;
}

const props = defineProps<Props>();
const loadings = ref({
  transaction_table: false,
});
const { showApiError } = useAlert();

onMounted(async () => {});

onMounted(async () => {
  accounts.value = await AccountsService.getMemberAccounts('12');
});

// watch(
//   () => props.member?.id,
//   (value) => {
//     if (value) {
//       handleGetTransactions();
//     }
//   }
// );

const handleGetTransactions = async () => {
  loadings.value.transaction_table = true;
  try {
    const { data } = await MembersService.getMemberAccountTrasactions(props.member?.id ?? '', {
      member_account_id: '2',
    });

    selected_account_transactions.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.transaction_table = false;
};
const handleViewTransactionClick = (value: MemberLoanTable) => {
  selected_account.value = value;
  showModal.value = true;
  handleGetTransactions();
};
</script>
