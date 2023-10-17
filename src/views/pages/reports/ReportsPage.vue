<template>
  <div class="card p-4 mb-0">
    <PageContentHeader :title="pageTitle"> </PageContentHeader>

    {{ filters.from_date }}

    <div class="flex gap-2">
      <Button
        type="button"
        icon="pi pi-filter"
        label="Filter"
        @click="($refs as any)?.op?.toggle($event)"
      />

      <Button
        type="button"
        icon="pi pi-refresh"
        label="Generate"
        class="p-button-outlined"
        :loading="loadings.reload"
        @click="reloadReport"
      />
    </div>

    <OverlayPanel
      ref="op"
      style="min-width: 18rem"
    >
      <div class="w-full">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="firstname2">Date Range</label>
            <Calendar
              show-button-bar
              date-format="yy-mm-dd"
              id="date-hired"
              v-model="filters.dates"
              selectionMode="range"
              :manualInput="false"
              mask="true"
            />
          </div>
        </div>

        <Button
          type="button"
          icon="pi pi-check"
          label="Apply"
          class="p-button-outlined"
          :loading="loadings.reload"
          @click="reloadReport"
        />
      </div>
    </OverlayPanel>
  </div>

  <p class="text-center p-5">
    Generated Report <span>from</span> {{ dateFormat(dates.from_date, DATE_FORMAT_DATE) }} <span>to</span>
    {{ dateFormat(dates.to_date, DATE_FORMAT_DATE) }}
  </p>

  <div class="grid">
    <div class="col-12 md:col-6">
      <div
        class="card"
        style="min-height: 20rem"
      >
        <PageContentHeader
          title="Loans Released"
          size="h5"
        />

        <ReleasedLoansReportChart
          :date-from="dates.from_date"
          :date-to="dates.to_date"
          :reload="reload"
        />

        <p class="text-center p-5 text-500">
          Generated Chart <span>from</span> {{ dateFormat(dates.from_date, DATE_FORMAT_DATE) }} <span>to</span>
          {{ dateFormat(dates.to_date, DATE_FORMAT_DATE) }}
        </p>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <PageContentHeader
          title="Revenue"
          size="h5"
        />

        <div class="flex justify-content-center">
          <RevenueReportChart
            :date-from="dates.from_date"
            :date-to="dates.to_date"
            :reload="reload"
          />
        </div>

        <p class="text-center p-5 text-500">
          Generated Chart <span>from</span> {{ dateFormat(dates.from_date, DATE_FORMAT_DATE) }} <span>to</span>
          {{ dateFormat(dates.to_date, DATE_FORMAT_DATE) }}
        </p>
      </div>
    </div>
  </div>

  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div
            class="grid gap-2 w-full p-2"
            v-if="loadings.reload"
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div v-else>
            <span class="block mb-3">Total share-capital amount</span>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.total_share_capital_amount)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div
            class="grid gap-2 w-full p-2"
            v-if="loadings.reload"
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div v-else>
            <span class="block mb-3">Total savings account amount</span>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.total_savings_account_amount ?? 0)) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div
            class="grid gap-2 w-full p-2"
            v-if="loadings.reload"
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div v-else>
            <span class="block mb-3">Total expenses amount</span>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.total_expenses_amount ?? 0)) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(fee, index) in counter.total_all_fees"
      :key="index"
      class="col-12 lg:col-6 xl:col-3"
    >
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div
            class="grid gap-2 w-full p-2"
            v-if="loadings.reload"
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div v-else>
            <span class="block mb-3">{{ fee.name }}</span>
            <div class="text-900 font-medium text-xl">{{ formatCurrency(Number(fee.amount ?? 0)) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(sub_trans, index) in counter.total_sub_types"
      :key="index"
      class="col-12 lg:col-6 xl:col-3"
    >
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div
            class="grid gap-2 w-full p-2"
            v-if="loadings.reload"
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div v-else>
            <span class="block mb-3">{{ sub_trans.name }}</span>
            <div class="text-900 font-medium text-xl">{{ formatCurrency(Number(sub_trans.amount ?? 0)) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TabView>
    <TabPanel header="Share Capitals">
      <ShareCapitalReportTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
    <TabPanel header="Expenses">
      <ExpensesReportTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
    <TabPanel header="Revenues">
      <RevenuesReportsTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
    <TabPanel header="Loans">
      <LoansReleasedTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
    <TabPanel header="Repayments">
      <LoanRepaymentReportTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
    <TabPanel header="Savings Account Transactions">
      <SavingsAccountTransactionReportTable
        :date-from="dates.from_date"
        :date-to="dates.to_date"
        :reload="reload"
      />
    </TabPanel>
  </TabView>
</template>
<script lang="ts" setup>
import PageContentHeader from '@/components/PageContentHeader.vue';
import useAlert from '@/composables/useAlert';
import { DATE_FORMAT_DATE, DATE_FORMAT_DB } from '@/constants';
import { dateFormat, formatCurrency } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import type { ReportCounterResponse } from '@/types/api/reports';
import type { AxiosError } from 'axios';
import moment from 'moment';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import { computed, onMounted, ref } from 'vue';
import ShareCapitalReportTable from './components/ShareCapitalReportTable.vue';
import ExpensesReportTable from './components/ExpensesReportTable.vue';
import RevenuesReportsTable from './components/RevenueReportTable.vue';
import LoansReleasedTable from './components/LoansReleasedTable.vue';
import LoanRepaymentReportTable from './components/LoanRepaymentReportTable.vue';
import SavingsAccountTransactionReportTable from './components/SavingsAccountTransactionReportTable.vue';
import OverlayPanel from 'primevue/overlaypanel';
import RevenueReportChart from './components/charts/RevenueReportChart.vue';
import ReleasedLoansReportChart from './components/charts/ReleasedLoansReportChart.vue';

const filters = ref<any>({
  dates: [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
});

const reload = ref(false);
const dates = computed(() => {
  return {
    from_date: filters.value.dates[0],
    to_date: filters.value.dates[1],
  };
});

const loadings = ref({
  reload: false,
  share_capital: false,
  cash_flow: false,
});

const counter = ref<ReportCounterResponse>({
  total_share_capital_amount: 0,
  total_savings_account_amount: 0,
  total_expenses_amount: 0,
  total_all_fees: [],
  total_sub_types: [],
});

const pageTitle = computed(() => {
  return 'Reports';
});

const { showApiError } = useAlert();

onMounted(() => {
  reloadReport();
});

const reloadReport = () => {
  reload.value = true;
  loadCounter();
  setTimeout(() => {
    reload.value = false;
  }, 2000);
};

const loadCounter = () => {
  loadings.value.reload = true;

  ReportsService.counter({
    from: dateFormat(dates.value.from_date, DATE_FORMAT_DB),
    to: dateFormat(dates.value.to_date, DATE_FORMAT_DB),
  })
    .then(({ data }) => {
      counter.value = data;
    })
    .catch((error) => {
      showApiError(error as AxiosError);
    })
    .finally(() => {
      loadings.value.reload = false;
    });
};
</script>
