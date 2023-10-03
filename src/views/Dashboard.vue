<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Members</span>
            <div class="text-900 font-medium text-xl">{{ counts.member_count }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-user text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">{{ counts.new_registered_since_last_week ?? '0' }} new </span>
        <span class="text-500">since last week</span>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Share Capital</span>
            <div class="text-900 font-medium text-xl">{{ counts.shared_capital_total }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">{{ counts.shared_capital_current_month }} shares </span>
        <span class="text-500">this month</span>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Overdue Accounts</span>
            <div class="text-900 font-medium text-xl">{{ counts.overdue_loan_count }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-red-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-money-bill text-red-500 text-xl"></i>
          </div>
        </div>
        <span class="text-red-500 font-medium">{{ counts.overdue_loans_current_month }} overdue(s) </span>
        <span class="text-500">this month</span>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Loan Released</span>
            <div class="text-900 font-medium text-xl">{{ counts.loan_released_count }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">{{ counts.loan_released_current_month }} released </span>
        <span class="text-500">this month</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Loans</h5>
        <DataTable
          :value="recentLoans"
          :rows="5"
          :paginator="true"
          responsive-layout="scroll"
          :loading="loadings.recent_loans"
        >
          <Column
            field="member.full_name"
            header="Member"
            sortable
          >
            <template #body="slotProps">
              <Button
                class="white-space-nowrap"
                :label="slotProps.data.member?.full_name"
                link
                @click="router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: slotProps.data.member_id } })"
              />
            </template>
          </Column>

          <Column
            field="loan_product.name"
            header="Type"
            class="white-space-nowrap"
            sortable
          ></Column>

          <Column
            field="applied_amount"
            header="Loan Amount"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.applied_amount ?? 0) }}
            </template>
          </Column>

          <Column style="width: 15%">
            <template #header> View </template>
            <template #body="slotProps">
              <Button
                icon="pi pi-eye"
                v-tooltip="'View'"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                @click="handleSelectedLoan(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <LoanView
          v-model:visible="modalsVisibility.view_loan"
          :loan-id="selectedLoan?.id"
          @hide="selectedLoan = undefined"
        />

        <small class="text-500">Loans created for the last 10 days</small>
      </div>
      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Active Loan Products</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="($refs as any).menu2.toggle($event)"
            ></Button>
            <Menu
              ref="menu2"
              :popup="true"
              :model="items"
            ></Menu>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Salary Loan</span>
              <div class="mt-1 text-600">1% Interest Rate</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div
                  class="bg-orange-500 h-full"
                  style="width: 50%"
                ></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">%50</span>
            </div>
          </li>

          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Negosyo Loan</span>
              <div class="mt-1 text-600">3% Interest Rate</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div
                  class="bg-orange-500 h-full"
                  style="width: 50%"
                ></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">%50</span>
            </div>
          </li>
        </ul>

        <small class="text-500">This area is working in progress...</small>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex align-items-center mb-5">
          <h5 class="m-0">Cash Flow (Year {{ currentYear.toString() }})</h5>
          <Dropdown
            filter
            :options="years"
            v-model="filters.cash_flow.year"
            option-value="value"
            option-label="label"
            placeholder="Select a Year"
            class="ml-auto"
            @change="loadCashflow"
          >
          </Dropdown>
        </div>
        <Skeleton
          v-if="loadings.cash_flow"
          style="height: 100px"
        />
        <Chart
          v-else
          type="line"
          :data="lineData"
          :options="lineOptions"
        />
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Recent Payments</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="($refs as any).menu1.toggle($event)"
            ></Button>
            <Menu
              ref="menu1"
              :popup="true"
              :model="items"
            ></Menu>
          </div>
        </div>
        <small class="text-500">This area is working in progress...</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import DashboardService from '@/service/DashboardService';
import type { DashboardCount, DashboardCashFlow } from '@/types/api/dashboard';
import moment from 'moment';
import { formatCurrency, generateYearListDropdown } from '@/helpers';
import type { AxiosError } from 'axios';
import useAlert from '@/composables/useAlert';
import type { Loan } from '@/types/ui/loans';
import { ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import router from '@/router';
import LoanView from '@/components/LoanView.vue';

const currentYear = computed(() => moment().get('year'));
const { isDarkTheme } = useLayout();

const modalsVisibility = ref({
  view_loan: false,
});

const filters = ref({
  cash_flow: {
    year: currentYear.value.toString(),
  },
});

const loadings = ref({
  cash_flow: false,
  recent_loans: false,
  counts: false,
});

const years = computed(() => generateYearListDropdown());
const counts = ref<DashboardCount>({
  shared_capital_total: 0,
  loan_released_count: 0,
  member_count: 0,
  overdue_loan_count: 0,
  shared_capital_current_month: 0,
  overdue_loans_current_month: 0,
  loan_released_current_month: 0,
});
const cashflow = ref<DashboardCashFlow[]>([
  {
    year: 0,
    month: '',
    flow: {
      expenses: 0,
      share_capital: 0,
      revenue: 0,
    },
  },
]);

const recentLoans = ref<Loan[]>([]);
const selectedLoan = ref<Loan | undefined>();
const products = ref(null);
const lineData = computed(() => ({
  labels: [...cashflow.value.map((r) => r.month)],
  datasets: [
    {
      label: 'Share Capital',
      data: [...cashflow.value.map((r) => r.flow.share_capital)],
      fill: false,
      backgroundColor: '#42c5f5',
      borderColor: '#42c5f5',
      tension: 0.4,
    },
    {
      label: 'Revenue',
      data: [...cashflow.value.map((r) => r.flow.revenue)],
      fill: false,
      backgroundColor: '#42f569',
      borderColor: '#42f569',
      tension: 0.4,
    },
    {
      label: 'Expenses',
      data: [...cashflow.value.map((r) => r.flow.expenses)],
      fill: false,
      backgroundColor: '#f54542',
      borderColor: '#f54542',
      tension: 0.4,
    },
  ],
}));
const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' },
]);

const { showApiError } = useAlert();

const lineOptions = ref<any>(null);
const productService = new ProductService();

onMounted(() => {
  productService.getProductsSmall().then((data: any) => (products.value = data));
  loadCounts();
  loadCashflow();
  loadRecentLoans();
});

const loadRecentLoans = async () => {
  loadings.value.recent_loans = true;
  try {
    const { data } = await DashboardService.recentLoans();
    recentLoans.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.recent_loans = false;
};

const loadCounts = async () => {
  loadings.value.counts = true;
  try {
    const { data } = await DashboardService.count();
    counts.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.counts = false;
};

const loadCashflow = async () => {
  loadings.value.cash_flow = true;
  try {
    const { data } = await DashboardService.cashFlow({ year: filters.value.cash_flow.year });
    cashflow.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.cash_flow = false;
};

const applyLightTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };
};

const handleSelectedLoan = (loan: Loan) => {
  selectedLoan.value = loan;
  modalsVisibility.value.view_loan = true;
};

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
      y: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
    },
  };
};

watch(
  isDarkTheme,
  (val) => {
    if (val) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  },
  { immediate: true }
);
</script>
