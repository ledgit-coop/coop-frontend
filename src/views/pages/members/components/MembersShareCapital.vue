<template>
  <div class="card mb-0">
    <div class="flex justify-content-between mb-3">
      <div>
        <span class="block text-500 font-medium mb-3">Share Capital as of September 2, 2023</span>
        <div class="text-900 font-medium text-xl">Php 200,000.00</div>
      </div>
      <div
        class="flex align-items-center justify-content-center bg-blue-100 border-round"
        style="width: 2.5rem; height: 2.5rem"
      >
        <i class="pi pi-fw pi-globe text-blue-500 text-xl"></i>
      </div>
    </div>
    <span class="text-green-500 font-medium">Last shared 10,000.0 </span>
    <br />
    <span class="text-500">was on Sept 2, 2023</span>
  </div>

  <PageContentHeader
    class="mt-5"
    title="Transactions"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :value="transactions"
    table-style="min-width: 50rem"
  >
    <Column
      field="reference_number"
      header="Transaction No."
      sortable
    ></Column>
    <Column
      field="particular"
      header="Particular"
    ></Column>

    <Column
      field="date"
      header="Date"
      sortable
    ></Column>

    <Column
      field="amount"
      header="Amount"
      sortable
    ></Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total Share Cap.:"
          :colspan="3"
          footer-style="text-align:right"
        />
        <Column footer="1,100.00" />
      </Row>
    </ColumnGroup>
  </DataTable>

  <PageContentHeader
    class="mt-5"
    title="Patronage Dividend History"
    size="h5"
  >
    <Dropdown
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
      field="reference_number"
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
      field="release_date"
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
  </DataTable>
</template>
<script setup lang="ts">
import MembersService from '@/service/MembersService';
import DataTable from 'primevue/datatable';
import { onMounted, ref } from 'vue';
import type { MembersShareCapitalTransactions, MembersShareCapitalPatronageHistory } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';

const transactions = ref<MembersShareCapitalTransactions[]>();
const patronage_history = ref<MembersShareCapitalPatronageHistory[]>();

onMounted(async () => {
  transactions.value = await MembersService.getMembersShareCapitalTransactions('1');
  patronage_history.value = await MembersService.getMembersShareCapitalPatronageHistory('1');
});
</script>
