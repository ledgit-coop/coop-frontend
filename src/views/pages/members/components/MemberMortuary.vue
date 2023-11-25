<template>
  <div class="flex col-12">
    <Button
      icon="pi pi-refresh"
      class="white-space-nowrap p-0 ml-auto"
      link
      label="Refresh"
      @click="loadhMortuaryTransactions"
    />
  </div>

  <div class="card mb-0">
    <Skeleton
      v-if="!props.member"
      class="w-full"
    ></Skeleton>
    <template v-else>
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Contribution as of {{ today }}</span>
          <div class="text-900 font-medium text-xl">{{ balance }}</div>
        </div>
        <div
          class="flex align-items-center justify-content-center bg-blue-100 border-round"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-fw pi-globe text-blue-500 text-xl"></i>
        </div>
      </div>
      <span class="text-green-500 font-medium">Last contribution {{ last_shared_amount }} </span>
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
      v-model="filters.mortuary_year"
      @change="handleMortuaryYearChange"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :loading="loadings.mortuary_table"
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
          footer="Total Contribution:"
          :colspan="3"
          footer-style="text-align:right"
        />
        <Column :footer="formatCurrency(transactions?.reduce((n, p) => n + (p?.amount ?? 0), 0) ?? 0)" />
      </Row>
    </ColumnGroup>

    <template #empty> No records found. </template>
  </DataTable>
</template>
<script setup lang="ts">
import MembersService from '@/service/MembersService';
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref, watch } from 'vue';
import type { Member } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import moment from 'moment';
import { formatCurrency } from '@/helpers';
import { DATE_FORMAT_DATE } from '@/constants';
import { dateFormat, generateYearListDropdown } from '@/helpers';
import type { AccountTransaction } from '@/types/ui/accounts';
import type { AxiosError } from 'axios';
import useAlert from '@/composables/useAlert';
import Button from 'primevue/button';

interface Props {
  member?: Member;
}

const props = defineProps<Props>();
const filters = ref({
  mortuary_year: moment().format('Y'),
});
const loadings = ref({
  mortuary_table: false,
});
const { showApiError } = useAlert();
const yearOptions = computed(() => generateYearListDropdown());
const today = moment().format(DATE_FORMAT_DATE);
const balance = computed(() => formatCurrency(props.member?.mortuary ? props.member?.mortuary.balance : 0));
const last_shared_amount = computed(() =>
  formatCurrency(
    props.member?.mortuary && props.member?.mortuary.latest_transaction
      ? props.member?.mortuary.latest_transaction.amount ?? 0
      : 0
  )
);
const last_shared_date = computed(() =>
  dateFormat(
    props.member?.mortuary && props.member?.mortuary.latest_transaction
      ? props.member?.mortuary.latest_transaction.transaction_date
      : null,
    DATE_FORMAT_DATE
  )
);
const transactions = ref<AccountTransaction[]>();

onMounted(() => {
  loadhMortuaryTransactions();
});

watch(
  () => props.member?.mortuary?.id,
  (value) => {
    if (value) loadhMortuaryTransactions();
  }
);

const handleMortuaryYearChange = () => {
  loadhMortuaryTransactions();
};
const loadhMortuaryTransactions = async () => {
  loadings.value.mortuary_table = true;
  try {
    console.log(props.member?.mortuary);
    const { data } = await MembersService.getMemberAccountTrasactions(props.member?.id ?? '', {
      member_account_id: props.member?.mortuary?.id.toString() ?? '0',
      year: filters.value.mortuary_year.toString() ?? '',
    });

    transactions.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.mortuary_table = false;
};
</script>
