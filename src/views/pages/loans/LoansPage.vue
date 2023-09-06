<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Member Loans">
          <Button
            icon="pi pi-plus"
            label="Apply Loan"
            @click="modalsVisibility.apply_form = true"
          ></Button>
        </PageContentHeader>

        <DataTable
          v-model:filters="filters1"
          :value="customer1"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          data-key="id"
          :row-hover="true"
          filter-display="menu"
          :loading="loading1"
          :filters="filters1"
          responsive-layout="scroll"
          :global-filter-fields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Keyword Search"
                  style="width: 100%"
                />
              </span>
            </div>
          </template>
          <template #empty> No loan records found. </template>
          <template #loading> Loading loan records. Please wait. </template>
          <Column
            field="name"
            header="Member"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="loan_type"
            header="Loan"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="Amount"
            header="Loan Amount"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="Amount"
            header="Approved Amount"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="amount"
            header="Terms"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="Amount"
            header="Interest (%)"
            style="min-width: 12rem"
          >
          </Column>
          <Column
            field="status"
            header="Status"
            style="min-width: 12rem"
          >
          </Column>

          <Column
            field="status"
            header="Remarks"
            style="min-width: 12rem"
          >
          </Column>
          <Column
            field="action"
            header="Action"
            style="min-width: 12rem"
          >
          </Column>
        </DataTable>

        <ApplyLoan v-model:visible="modalsVisibility.apply_form" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount } from 'vue';
import Button from 'primevue/button';
import router from '@/router';
import { ROUTE_NAME_LOANS_CREATE } from '@/constants/routes';
import PageContentHeader from '../../components/PageContentHeader.vue';
import ApplyLoan from '@/views/components/ApplyLoan.vue';

interface ModalsVisibility {
  apply_form: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
});

const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const idFrozen = ref(false);
const products = ref(null);
const expandedRows = ref([]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const representatives = ref([
  { name: 'Amy Elsner', image: 'amyelsner.png' },
  { name: 'Anna Fali', image: 'annafali.png' },
  { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  { name: 'Onyama Limba', image: 'onyamalimba.png' },
  { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  { name: 'XuXue Feng', image: 'xuxuefeng.png' },
]);

const customerService = new CustomerService();
const productService = new ProductService();

onBeforeMount(() => {
  productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
  customerService.getCustomersLarge().then((data) => {
    customer1.value = data;
    loading1.value = false;
    customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
  });
  customerService.getCustomersLarge().then((data) => (customer2.value = data));
  customerService.getCustomersMedium().then((data) => (customer3.value = data));
  loading2.value = false;

  initFilters1();
});

const initFilters1 = () => {
  filters1.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
};

const clearFilter1 = () => {
  initFilters1();
};

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
const calculateCustomerTotal = (name) => {
  let total = 0;
  if (customer3.value) {
    for (let customer of customer3.value) {
      if (customer.representative.name === name) {
        total++;
      }
    }
  }

  return total;
};
</script>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
