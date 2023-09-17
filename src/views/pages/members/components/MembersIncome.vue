<template>
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
<script lang="ts" setup>
import PageContentHeader from '@/components/PageContentHeader.vue';
import type { MembersShareCapitalPatronageHistory } from '@/types/ui/members';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';

const patronage_history = ref<MembersShareCapitalPatronageHistory[]>();
</script>
