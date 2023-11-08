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

      <Button
        type="button"
        icon="pi pi-download"
        label="Export PDF"
        class="p-button-outlined"
        @click="exportPdf"
      />
    </div>

    <OverlayPanel
      ref="op"
      style="min-width: 20rem"
    >
      <div class="w-full">
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="firstname2">Date Range</label>
            <Calendar
              show-button-bar
              showIcon
              date-format="M-dd-yy"
              id="date-hired"
              v-model="filters.dates"
              selectionMode="range"
              :manualInput="false"
              :hide-on-range-selection="true"
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

  <div
    ref="reportOverview"
    class="report-overview"
  >
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
              <span class="block mb-3">Total share capital amount</span>
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
              <span class="block mb-3">Total loan released amount</span>
              <div class="text-900 font-medium text-xl">
                {{ formatCurrency(Number(counter.total_loan_released_amount ?? 0)) }}
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
              <Label
                class="pb-3"
                help-text="Amortization amount is computed including penalties and interest."
                >Total loan amortizaion collected</Label
              >
              <div class="text-900 font-medium text-xl">
                {{ formatCurrency(Number(counter.total_collected_amortization ?? 0)) }}
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
              <Label
                class="pb-3"
                help-text="Loan amortization for collection which includes interest, penalties and principal amount."
                >Total loans collection</Label
              >
              <div class="text-900 font-medium text-xl">
                {{ formatCurrency(Number(counter.total_loans_collection ?? 0)) }}
              </div>
            </div>
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

  <p class="text-center p-5 font-bold">All Time Report</p>

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
            <span class="block mb-3">Total expenses amount</span>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_total_expenses_amount ?? 0)) }}
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
            <Label class="pb-3">Total released loan amount</Label>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_total_loan_released_amount ?? 0)) }}
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
            <Label class="pb-3">Total loan interest amount</Label>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_interest_loan_interest ?? 0)) }}
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
            <Label
              class="pb-3"
              help-text="Loan amortization for collection which includes interest, penalties and principal amount."
              >Total unpaid loans</Label
            >
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_total_loans_collection ?? 0)) }}
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
            <Label
              class="pb-3"
              help-text="Loan amortization collected which includes interest, penalties and principal amount."
              >Total paid loans</Label
            >
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_total_loans_collected ?? 0)) }}
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
            <Label class="pb-3">Total share capital amount</Label>
            <div class="text-900 font-medium text-xl">
              {{ formatCurrency(Number(counter.all_time_share_capital_total_amount ?? 0)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import Label from '@/components/Label.vue';

// @ts-ignore
import html2pdf from 'html2pdf.js';

const filters = ref<any>({
  dates: [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
});
const reportOverview = ref();
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
  total_loans_collection: 0,
  total_all_fees: [],
  total_sub_types: [],
  all_time_total_expenses_amount: 0,
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

const exportPdf = () => {
  console.log(reportOverview.value);

  var opt = {
    margin: 10,
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: 'A3', orientation: 'portrait' },
    filename: `test.pdf`,
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(reportOverview.value).save();
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
