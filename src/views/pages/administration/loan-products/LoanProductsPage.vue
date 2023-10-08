<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Products">
          <Button
            icon="pi pi-plus"
            label="Add Product"
            @click="handleAddClick"
          ></Button>
        </PageContentHeader>
        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="loanProducts"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          :rowsPerPageOptions="[10, 20, 50, 100]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          @sort="onSort"
          @page="onPageChange"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div class="flex gap-2">
                <Button
                  type="button"
                  icon="pi pi-filter-slash"
                  label="Clear"
                  class="p-button-outlined mb-2"
                  size="small"
                  @click="clearFilters()"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <span class="p-input-icon-left mb-2">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters.keyword"
                    placeholder="Keyword Search"
                    style="width: 100%"
                    @keydown.enter="loadTable(params)"
                  />
                </span>
              </div>
            </div>
          </template>
          <template #empty> No records found. </template>
          <Column field="id">
            <template #body="slotProps">
              <i
                v-if="slotProps.data.locked"
                class="pi pi-lock"
                style="color: 'var(--primary-color)'"
              ></i>
            </template>
          </Column>

          <Column
            field="id"
            header="ID"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="name"
            header="Name"
            sort-field="name"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="created_at"
            header="Created At"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="default_principal_amount"
            header="Loanable Amount"
            style="min-width: 12rem"
            sortable
          >
            <template #body="slotProps">
              {{
                `${formatNumber(slotProps.data.min_principal_amount)} / ${formatNumber(
                  slotProps.data.default_principal_amount
                )} / ${formatNumber(slotProps.data.max_principal_amount)}`
              }}
            </template>
          </Column>
          <Column
            field="loan_interest_period"
            header="Interest"
            style="min-width: 12rem"
            sortable
          >
            <template #body="slotProps">
              {{ `${slotProps.data.loan_interest_period ?? '--'}/${slotProps.data.default_loan_interest ?? '--'}` }}
            </template>
          </Column>
          <Column
            field="id"
            header="Action"
            align-frozen="right"
            style="min-width: 12rem"
            frozen
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button
                  icon="pi pi-pencil"
                  v-tooltip="'Edit'"
                  text
                  raised
                  severity="warning"
                  rounded
                  class="mr-2 mb-2"
                  size="small"
                  @click="handleEditClick(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  v-tooltip="'Delete'"
                  text
                  raised
                  severity="danger"
                  rounded
                  class="mr-2 mb-2"
                  @click="handleLoanDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <LoanProductSave
          @updated="loadTable(params)"
          :id="selectedProduct?.id"
          v-model:visible="modalsVisibility.save_product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from 'primevue/button';
import type { LoanProduct } from '@/types/ui/loan-products';
import type { LoanProductListPayload } from '@/types/api/loan-product';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanProductSave from './LoanProductSave.vue';
import DataTable from 'primevue/datatable';
import LoanProductService from '@/service/LoanProductService';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { formatNumber } from '@/helpers';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';

interface ModalsVisibility {
  save_product: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  save_product: false,
});

const filters = ref({
  status: '',
  keyword: '',
});
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);

const loanProducts = ref<LoanProduct[]>();
const selectedProduct = ref<LoanProduct | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
});

watch(params, (params) => {
  loadTable(params);
});

const handleEditClick = (product: LoanProduct) => {
  selectedProduct.value = product;
  modalsVisibility.value.save_product = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
};

const handleAddClick = () => {
  modalsVisibility.value.save_product = true;
  selectedProduct.value = undefined;
};

const loadTable = (params?: LoanProductListPayload) => {
  if (!loadings.value.table) {
    loadings.value.table = true;
    LoanProductService.list(params)
      .then((res) => {
        loanProducts.value = res.data.data;
        paginate(res.data);
      })
      .catch(() => {
        showApiError();
      })
      .finally(() => {
        loadings.value.table = false;
      });
  }
};

const handleLoanDeleteClick = (product: LoanProduct) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Loan Product',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await LoanProductService.destroy(product.id);
        showSuccess('Loan product successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};
</script>
