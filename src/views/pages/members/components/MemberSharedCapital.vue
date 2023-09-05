<template>
  <div class="card mb-0">
    <div class="flex justify-content-between mb-3">
      <div>
        <span class="block text-500 font-medium mb-3">Orders</span>
        <div class="text-900 font-medium text-xl">152</div>
      </div>
      <div
        class="flex align-items-center justify-content-center bg-blue-100 border-round"
        style="width: 2.5rem; height: 2.5rem"
      >
        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
      </div>
    </div>
    <span class="text-green-500 font-medium">24 new </span>
    <span class="text-500">since last visit</span>
  </div>

  <h4>Transactions</h4>
  <DataTable
    :value="products"
    tableStyle="min-width: 50rem"
  >
    <Column
      field="code"
      header="Transaction No."
    ></Column>
    <Column
      field="name"
      header="Particular"
    ></Column>
    <Column
      field="category"
      header="Date"
    ></Column>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { ref } from 'vue';

const products = ref<any[]>();
</script>
