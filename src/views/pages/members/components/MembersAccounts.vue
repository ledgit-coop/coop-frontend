<template>
  <div class="flex col-12">
    <Button
      icon="pi pi-refresh"
      class="white-space-nowrap p-0 ml-auto"
      link
      label="Refresh"
      @click="loadAccounts()"
    />
  </div>

  <PageContentHeader
    title="Accounts"
    size="h5"
  >
  </PageContentHeader>

  <DataTable
    :value="accounts"
    :loading="loadings.accounts_table"
    table-style="min-width: 50rem"
    scrollable
    export-filename="accounts"
    ref="accountsTable"
  >
    <template #header>
      <div class="flex justify-content-between flex-column sm:flex-row">
        <Button
          type="button"
          icon="pi pi-download"
          label="Export"
          class="p-button-outlined mb-2"
          size="small"
          @click="($refs as any)?.accountsTable?.exportCSV()"
        />

        <div class="grid gap-1 m-0 align-items-start ml-auto">
          <Dropdown
            showClear
            filter
            v-model="filters.status"
            option-value="value"
            option-label="label"
            :options="accountStatuses"
            placeholder="Select a Status"
            @change="loadAccounts"
          >
          </Dropdown>

          <Dropdown
            showClear
            filter
            option-value="value"
            option-label="label"
            v-model="filters.year"
            :options="years"
            placeholder="Select a Opened Year"
            @change="loadAccounts"
          >
          </Dropdown>
        </div>
      </div>
    </template>

    <template #empty> No records found. </template>

    <Column
      field="account_number"
      header="Account No."
      sortable
    ></Column>

    <Column
      field="type"
      header="Type"
      sortable
    >
      <template #body="slotProps">
        {{ slotProps.data.account?.name }}
      </template>
    </Column>

    <Column
      field="account_holder"
      header="Holder"
    ></Column>

    <Column
      field="created_at"
      header="Opened Date"
      sortable
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.created_at) }}
      </template>
    </Column>
    <Column
      field="balance"
      header="Current Balance"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.balance) }}
      </template>
    </Column>

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
      style="min-width: 6rem; width: 8rem"
      frozen
    >
      <template #body="slotProps">
        <div class="flex gap-2">
          <Button
            icon="pi pi-trash"
            :disabled="slotProps.data.has_balance"
            v-tooltip="'Delete Account'"
            text
            raised
            rounded
            severity="danger"
            class="mr-2 mb-2"
            size="small"
            @click="handleDeleteClick(slotProps.data)"
          />

          <Button
            v-tooltip="'View Transactions'"
            text
            raised
            rounded
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
    :style="{ width: '60vw' }"
  >
    <PageContentHeader
      :title="selected_account?.account?.name"
      size="h5"
    >
    </PageContentHeader>

    <AccountTransactionsTable
      :hide-columns="['type']"
      :loading="loadings.transaction_table"
      :transactions="selected_account_transactions"
      show-action
      :display="accountTransactionDisplay"
      @on-delete-click="handleTransactionDeleteClick"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref, watch } from 'vue';
import type { Member, MemberAccount } from '@/types/ui/members';
import type { AccountTransaction } from '@/types/ui/accounts';

import PageContentHeader from '@components/PageContentHeader.vue';
import Button from 'primevue/button';
import { AccountStatus, MemberAccountTransactionType } from '@/constants/ui/accounts';
import AccountTransactionsTable from '@components/AccountTransactionsTable.vue';
import Dialog from 'primevue/dialog';
import MembersService from '@/service/MembersService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { dateFormat, formatCurrency, generateYearListDropdown } from '@/helpers';
import moment from 'moment';
import type { DropdownOption } from '@/types/ui';
import { useConfirm } from 'primevue/useconfirm';

interface Props {
  member?: Member;
}

const filters = ref({
  year: moment().get('year').toString(),
  status: undefined,
});
const confirm = useConfirm();
const years = computed(() => generateYearListDropdown());
const accountStatuses = computed<DropdownOption[]>(() => [
  { label: 'Active', value: AccountStatus.ACTIVE },
  { label: 'Dormant', value: AccountStatus.DORMANT },
]);
const accountTransactionDisplay = computed(() =>
  selected_account && selected_account.value?.account?.type === 'regular' ? 'summary' : 'transactional'
);
const showModal = ref(false);
const accounts = ref<MemberAccount[]>();
const selected_account = ref<undefined | MemberAccount>();
const selected_account_transactions = ref<AccountTransaction[]>();
const props = defineProps<Props>();
const loadings = ref({
  transaction_table: false,
  accounts_table: false,
});
const { showApiError, showSuccess } = useAlert();

watch(
  () => props.member?.id,
  (value) => {
    if (value) {
      loadAccounts();
    }
  }
);

onMounted(() => {
  loadAccounts();
});

const loadAccounts = async () => {
  loadings.value.accounts_table = true;
  try {
    const { data } = await MembersService.getAccounts(Number(props.member?.id ?? 0), { ...filters.value });
    accounts.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.accounts_table = false;
};

const handleGetTransactions = async () => {
  loadings.value.transaction_table = true;
  try {
    const { data } = await MembersService.getMemberAccountTrasactions(props.member?.id ?? '', {
      member_account_id: selected_account.value?.id.toString() ?? '',
    });

    selected_account_transactions.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.transaction_table = false;
};
const handleViewTransactionClick = (value: MemberAccount) => {
  selected_account.value = value;
  showModal.value = true;

  handleGetTransactions();
};

const handleDeleteClick = (value: MemberAccount) => {
  confirm.require({
    message: 'The selected account has no balance and it is safe to delete do you want to proceed?',
    header: 'Delete Account',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await MembersService.deleteAccount(value.id ?? 0);
        showSuccess('Account successfully deleted.');
        loadAccounts();
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const handleTransactionDeleteClick = (value: AccountTransaction) => {
  let message = 'Are you sure you want to delete the transaction?';
  if (value.posted && value.type !== MemberAccountTransactionType.LOAN_PAYMENT) {
    message = 'The transaction is already posted are you sure you want to proceed?';
  } else if (value.posted && value.type === MemberAccountTransactionType.LOAN_PAYMENT) {
    message =
      'The transaction is already posted are you sure you want to proceed? Please also make sure that you will reconcile the loan schedules.';
  } else if (!value.posted && value.type === MemberAccountTransactionType.LOAN_PAYMENT) {
    message =
      'Please also make sure that you will reconcile the loan schedules before you proceed. Do you want to proceed?';
  }

  confirm.require({
    message,
    header: 'Delete Transaction',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await MembersService.deleteAccountTransaction(Number(value.id ?? 0));
        showSuccess('Account transaction successfully deleted.');
        handleGetTransactions();
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};
</script>
