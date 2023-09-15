<template>
  <div class="card mb-0">
    <Skeleton
      v-if="!props.member"
      class="w-full"
    ></Skeleton>
    <template v-else>
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Share Capital as of {{ today }}</span>
          <div class="text-900 font-medium text-xl">{{ balance }}</div>
        </div>
        <div
          class="flex align-items-center justify-content-center bg-blue-100 border-round"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-fw pi-globe text-blue-500 text-xl"></i>
        </div>
      </div>
      <span class="text-green-500 font-medium">Last shared {{ last_shared_amount }} </span>
      <br />
      <span class="text-500">was on {{ last_shared_date }}</span>
    </template>
  </div>

  <PageContentHeader
    class="mt-5"
    title="Transactions"
    size="h5"
  >
    <Dropdown
      showClear
      filter
      option-value="value"
      option-label="label"
      :options="yearOptions"
      v-model="filters.share_capital_year"
      @change="handleShareCapitalYearChange"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :loading="loadings.share_capital_table"
    :value="transactions"
    table-style="min-width: 50rem"
  >
    <Column
      field="transaction_number"
      header="Transaction No."
      sortable
    ></Column>
    <Column
      field="particular"
      header="Particular"
    ></Column>

    <Column
      field="transaction_date"
      header="Date"
      sortable
    ></Column>

    <Column
      field="amount"
      header="Amount"
      sortable
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.amount ?? 0) }}
      </template>
    </Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total Share Cap.:"
          :colspan="3"
          footer-style="text-align:right"
        />
        <Column :footer="formatCurrency(transactions?.reduce((n, p) => n + (p?.amount ?? 0), 0) ?? 0)" />
      </Row>
    </ColumnGroup>

    <template #empty> No records found. </template>
  </DataTable>

  <PageContentHeader
    class="mt-5"
    title="Patronage Dividend History"
    size="h5"
  >
    <Dropdown
      showClear
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :value="patronage_history"
    table-style="min-width: 50rem"
  >
    <Column
      field="transaction_number"
      header="Transaction No."
      sortable
    ></Column>
    <Column
      field="year"
      header="Year"
      sortable
    ></Column>
    <Column
      field="recorded_share_capital"
      header="Reflected Share Cap."
      sortable
    ></Column>
    <Column
      field="percentage"
      header="Percentage"
    ></Column>
    <Column
      field="released_date"
      header="Release Date"
      sortable
    ></Column>

    <Column
      field="amount"
      header="Dividend"
      sortable
    ></Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total Dividend Released:"
          :colspan="5"
          footer-style="text-align:right"
        />
        <Column footer="1,100.00" />
      </Row>
    </ColumnGroup>
    <template #empty> No records found. </template>
  </DataTable>
</template>
<script setup lang="ts">
import MembersService from '@/service/MembersService';
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref, watch } from 'vue';
import type { MembersShareCapitalPatronageHistory, Member } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import moment from 'moment';
import { formatCurrency } from '@/helpers';
import { DATE_FORMAT_DATE } from '@/constants';
import { dateFormat, generateYearListDropdown } from '@/helpers';
import type { AccountTransaction } from '@/types/ui/accounts';
import type { AxiosError } from 'axios';
import useAlert from '@/composables/useAlert';

interface Props {
  member?: Member;
}

const props = defineProps<Props>();
const filters = ref({
  share_capital_year: moment().format('Y'),
});
const loadings = ref({
  share_capital_table: false,
});
const { showApiError } = useAlert();
const yearOptions = computed(() => generateYearListDropdown());
const today = moment().format(DATE_FORMAT_DATE);
const balance = computed(() => formatCurrency(props.member?.share_capital ? props.member?.share_capital.balance : 0));
const last_shared_amount = computed(() =>
  formatCurrency(
    props.member?.share_capital && props.member?.share_capital.latest_transaction
      ? props.member?.share_capital.latest_transaction.amount ?? 0
      : 0
  )
);
const last_shared_date = computed(() =>
  dateFormat(
    props.member?.share_capital && props.member?.share_capital.latest_transaction
      ? props.member?.share_capital.latest_transaction.transaction_date
      : null,
    DATE_FORMAT_DATE
  )
);
const transactions = ref<AccountTransaction[]>();
const patronage_history = ref<MembersShareCapitalPatronageHistory[]>();

onMounted(async () => {
  // patronage_history.value = await MembersService.getMembersShareCapitalPatronageHistory('1');
});

watch(
  () => props.member?.share_capital.id,
  (value) => {
    if (value) loadhShareCapitalTransactions();
  }
);

const handleShareCapitalYearChange = () => {
  loadhShareCapitalTransactions();
};
const loadhShareCapitalTransactions = async () => {
  loadings.value.share_capital_table = true;

  try {
    const { data } = await MembersService.getMemberAccountTrasactions(props.member?.id ?? '', {
      member_account_id: props.member?.share_capital.id.toString() ?? '',
      year: filters.value.share_capital_year.toString() ?? '',
    });
    transactions.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.share_capital_table = false;
};
</script>
