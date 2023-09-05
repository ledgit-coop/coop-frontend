<template>
  <MembersLoanWidget
    v-if="loans.length > 1"
    :loans="loans"
  />
  <h4>Loan History</h4>
  <DataTable
    :value="products"
    tableStyle="min-width: 50rem"
  >
    <Column
      field="code"
      header="Loan No."
    ></Column>
    <Column
      field="name"
      header="Status"
    ></Column>
    <Column
      field="name"
      header="Type"
    ></Column>
    <Column
      field="category"
      header="Loan Date"
    ></Column>
    <Column
      field="category"
      header="Loan Amount"
    ></Column>
    <Column
      field="category"
      header="Approved Amount"
    ></Column>
    <Column
      field="category"
      header="Interest Rate (%)"
    ></Column>
    <Column
      field="category"
      header="Outstanding Balance"
    ></Column>
    <Column
      field="category"
      header="Action  "
    ></Column>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { ref } from 'vue';
import MembersLoanWidget from './MembersLoanWidget.vue';
import type { MemberLoanWidgetItem } from '@/constants/ui/members';

const products = ref<any[]>();
const loans = ref<MemberLoanWidgetItem[]>([
  {
    type: 'Salary Loan',

    balance: 202040.2,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
  {
    type: 'Emergency Loan',

    balance: 200000,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
]);
</script>
