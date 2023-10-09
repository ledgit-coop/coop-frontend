<template>
  <div class="card">
    <PageContentHeader title="Share Capitals"> </PageContentHeader>

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
  </div>

  <div class="card">
    <PageContentHeader title="Revenues"> </PageContentHeader>

    <DataTable
      :loading="loading"
      :value="transactions"
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
  </div>

  <div class="card">
    <PageContentHeader title="Expenses"> </PageContentHeader>

    <DataTable
      :loading="loading"
      :value="transactions"
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
  </div>
</template>
<script lang="ts" setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
</script>
