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

        <LoansTable
          :model-value="loans"
          :rows="rows"
          :loading="loadings.table"
          v-model:download="download"
          :total-records="totalRecords"
          @sort="onSort"
          @page="onPageChange"
          @update:rows="onRowsChange"
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

                <Button
                  type="button"
                  icon="pi pi-download"
                  label="Export"
                  class="p-button-outlined mb-2"
                  size="small"
                  @click="download = true"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <Dropdown
                  showClear
                  filter
                  option-value="value"
                  option-label="label"
                  v-model="filters.loan_product_id"
                  @change="loadTable(params)"
                  :loading="loadings.loan_products"
                  placeholder="Select Type of Loan"
                  :options="loanProducts"
                >
                </Dropdown>

                <Dropdown
                  showClear
                  filter
                  option-value="value"
                  option-label="label"
                  placeholder="Select Status"
                  style="min-width: 10rem"
                  v-model="filters.status"
                  :options="statuses"
                  @change="loadTable(params)"
                >
                </Dropdown>

                <span class="p-input-icon-left mb-2">
                  <i class="pi pi-search" />
                  <InputText
                    placeholder="Keyword Search"
                    style="width: 100%"
                    v-model="filters.keyword"
                    @keydown.enter="loadTable(params)"
                  />
                </span>
              </div>
            </div>
          </template>

          <template #action="slotProps">
            <LoanActions
              :loan="slotProps.data"
              @updated="loadTable(params)"
            />
          </template>
        </LoansTable>

        <LoanSave
          @saved="loadTable(params)"
          v-model:visible="modalsVisibility.apply_form"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import LoanSave from '@components/LoanSave.vue';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanService from '@/service/LoanService';
import LoansTable from '@/components/LoansTable.vue';
import useTableParameters from '@/composables/useTableParameters';
import type { Loan } from '@/types/ui/loans';
import type { AxiosError } from 'axios';
import useAlert from '@/composables/useAlert';
import LoanActions from '@/components/LoanActions.vue';
import type { DropdownOption } from '@/types/ui';
import { MemberLoanStatusDropdowns } from '@/constants/ui/members';
import Dropdown from 'primevue/dropdown';
import UtilityService from '@/service/UtilityService';

interface ModalsVisibility {
  apply_form: boolean;
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
  view_loan: false,
});

const filters = ref({
  loan_product_id: undefined,
  keyword: undefined,
  status: undefined,
});

const statuses = ref<DropdownOption[]>(MemberLoanStatusDropdowns);
const { rows, paginate, params, totalRecords, onSort, onPageChange, onRowsChange } = useTableParameters(filters);
const download = ref(false);
const loans = ref<Loan[]>([]);
const loanProducts = ref<DropdownOption[]>([]);

const loadings = ref({
  table: false,
  loan_products: false,
});
const { showApiError } = useAlert();

onMounted(() => {
  loadTable(params.value);
  getLoanProducts();
});

watch(params, (params) => {
  loadTable(params);
});

const getLoanProducts = async () => {
  try {
    loadings.value.loan_products = true;
    const { data: dropdown } = await UtilityService.getLoanProducts();
    loanProducts.value = dropdown;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const loadTable = async (params?: Record<string, any>) => {
  loadings.value.table = true;
  try {
    const { data } = await LoanService.list({
      ...params,
    });

    loans.value = data.data;

    paginate(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.table = false;
};

const clearFilters = () => {
  filters.value = {
    loan_product_id: undefined,
    keyword: undefined,
    status: undefined,
  };
};
</script>
