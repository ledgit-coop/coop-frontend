<template>
  <div class="card p-4">
    <PageContentHeader :title="pageTitle">
      <h5>
        Report <span>from</span> {{ dateFormat(dates.from_date, DATE_FORMAT_DATE) }} <span>to</span>
        {{ dateFormat(dates.to_date, DATE_FORMAT_DATE) }}
      </h5>
    </PageContentHeader>

    {{ filters.from_date }}

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-3">
        <label for="firstname2">Date Range</label>
        <Calendar
          showButtonBar
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
      icon="pi pi-refresh"
      label="Generate"
      class="p-button-outlined mb-2"
      size="small"
      :loading="loadings.reload"
      @click="reloadReport"
    />
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
            <span class="block mb-3">Total membership-fee amount</span>
            <div class="text-900 font-medium text-xl">1000.00 Php</div>
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
            <span class="block mb-3">Total processing-fee amount</span>
            <div class="text-900 font-medium text-xl">1000.00 Php</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0 p-4">
        <div class="flex justify-content-between">
          <div>
            <span class="block mb-3">Total documentary stamp amount</span>
            <div class="text-900 font-medium text-xl">1000.00 Php</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TabView>
    <TabPanel header="Share Capitals">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
    </TabPanel>
    <TabPanel header="Expenses">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
    </TabPanel>
    <TabPanel header="Revenues">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
    </TabPanel>
    <TabPanel header="Loans">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
    </TabPanel>
    <TabPanel header="Repayments">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
    </TabPanel>
    <TabPanel header="Savings Account Transactions">
      <DataTable
        table-style="min-width: 50rem"
        ref="table"
        export-filename="account-transactions"
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button
              type="button"
              icon="pi pi-download"
              label="Export"
              class="p-button-outlined mb-2"
              size="small"
              @click="($refs as any)?.table?.exportCSV()"
            />
          </div>
        </template>

        <Column
          field="name"
          header="Fee"
        ></Column>
        <Column
          field="amount"
          header="Amount"
        ></Column>

        <Column
          field="amount"
          header="Options"
        ></Column>

        <Column
          field="amount"
          header="Actions"
        ></Column>

        <template #empty> No records found. </template>
      </DataTable>
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

const filters = ref<any>({
  dates: [moment().toDate(), moment().toDate()],
});

const dates = computed(() => {
  return {
    from_date: filters.value.dates[0],
    to_date: filters.value.dates[1],
  };
});

const loadings = ref({
  reload: false,
});

const counter = ref<ReportCounterResponse>({
  total_share_capital_amount: 0,
  total_savings_account_amount: 0,
  total_expenses_amount: 0,
});

const pageTitle = computed(() => {
  return 'Reports';
});

const { showApiError } = useAlert();

onMounted(() => {});

const reloadReport = () => {
  loadCounter();
};

const loadCounter = async () => {
  loadings.value.reload = true;

  try {
    const { data } = await ReportsService.counter({
      from: dateFormat(dates.value.from_date, DATE_FORMAT_DB),
      to: dateFormat(dates.value.to_date, DATE_FORMAT_DB),
    });

    counter.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.reload = false;
};
</script>
