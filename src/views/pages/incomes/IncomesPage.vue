<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Incomes">
          <Button
            icon="pi pi-plus"
            label="Add Incomes"
            @click="handleAddClick"
          ></Button>
        </PageContentHeader>
        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="incomes"
          data-key="id"
          filter-display="menu"
          export-filename="incomes"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          :rowsPerPageOptions="[10, 20, 50, 100, 500, 1000]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
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
                  @click="($refs as any)?.table?.exportCSV()"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <div class="w-18rem">
                  <Calendar
                    date-format="M-dd-yy"
                    mask="true"
                    id="applied-date"
                    v-model="filters.transaction_dates"
                    show-button-bar
                    show-icon
                    class="w-full"
                    selectionMode="range"
                    placeholder="Filter Transaction Date"
                    @hide="loadTable(params)"
                    :hide-on-range-selection="true"
                  />
                </div>

                <Dropdown
                  showClear
                  filter
                  option-value="value"
                  option-label="label"
                  v-model="filters.transaction_sub_type_id"
                  @change="loadTable(params)"
                  :loading="loadings.income_type_fetch"
                  placeholder="Select Type of Income"
                  :options="incomeType"
                >
                </Dropdown>

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
          <Column
            field="transaction_number"
            header="Transaction #"
            sort-field="transaction_number"
            class="white-space-nowrap"
            sortable
            frozen
          >
          </Column>

          <Column
            field="amount"
            header="Amount"
            sort-field="amount"
            class="white-space-nowrap"
            sortable
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.amount) }}
            </template>
          </Column>

          <Column
            field="particular"
            header="Particular"
            sort-field="particular"
            style="min-width: 12rem"
            class="white-space-nowrap"
            sortable
          >
          </Column>
          <Column
            field="transaction_date"
            header="Date"
            class="white-space-nowrap"
            sortable
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.transaction_date, DATE_FORMAT_DATE) }}
            </template>
          </Column>

          <Column
            field="transaction_sub_type.name"
            header="Income Type"
            sort-field="transaction_sub_type_id"
            class="white-space-nowrap"
            sortable
          >
          </Column>

          <Column
            field="created_by"
            header="Created By"
            class="white-space-nowrap"
            sortable
          >
          </Column>

          <Column
            field="created_at"
            header="Created At"
            style="min-width: 12rem"
            sortable
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.created_at, DATE_TIME_FORMAT) }}
            </template>
          </Column>

          <Column
            field="id"
            header="Action"
            align-frozen="right"
            class="froze-right"
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
                  @click="handleIncomeDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <IncomeSave
          @updated="loadTable(params)"
          @hide="selectedTransaction = undefined"
          :id="selectedTransaction?.id"
          v-model:visible="modalsVisibility.save_transaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@/components/PageContentHeader.vue';
import IncomeSave from './IncomeSave.vue';
import DataTable from 'primevue/datatable';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';
import type { Transaction } from '@/types/ui/transactions';
import IncomeService from '@/service/IncomeService';
import type { IncomesListPayload } from '@/types/api/income';
import { dateFormat, formatNumber } from '@/helpers';
import { DATE_TIME_FORMAT, DATE_FORMAT_DATE } from '@/constants';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';

interface ModalsVisibility {
  save_transaction: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  save_transaction: false,
});

const incomeType = ref<DropdownOption[]>([]);

const filters = ref<{
  status: string;
  keyword: string;
  transaction_sub_type_id: any;
  transaction_dates?: any;
}>({
  status: '',
  keyword: '',
  transaction_sub_type_id: undefined,
  transaction_dates: [],
});
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);

const incomes = ref<Transaction[]>();
const selectedTransaction = ref<Transaction | undefined>();
const loadings = ref({
  table: false,
  income_type_fetch: false,
});

onMounted(async () => {
  loadTable();
  loadIncomeSubTypes();
});

watch(params, (params) => {
  loadTable(params);
});

const handleEditClick = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
  modalsVisibility.value.save_transaction = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
    transaction_sub_type_id: undefined,
    transaction_dates: [],
  };
};

const handleAddClick = () => {
  modalsVisibility.value.save_transaction = true;
  selectedTransaction.value = undefined;
};

const loadTable = (params?: IncomesListPayload) => {
  if (!loadings.value.table) {
    loadings.value.table = true;
    IncomeService.list(params)
      .then((res) => {
        incomes.value = res.data.data;
        paginate(res.data);
      })
      .catch((error) => {
        showApiError(error);
      })
      .finally(() => {
        loadings.value.table = false;
      });
  }
};

const handleIncomeDeleteClick = (transaction: Transaction) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Income',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await IncomeService.destroy(transaction.id);
        showSuccess('Income successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const loadIncomeSubTypes = () => {
  loadings.value.income_type_fetch = true;
  UtilityService.getTransactionSubTypeIncomes()
    .then(({ data }) => {
      incomeType.value = data.map<DropdownOption>((t) => ({
        label: t.name?.toString() ?? '',
        value: t.id.toString() ?? '',
      }));
    })
    .catch((error) => {
      showApiError(error);
    })
    .finally(() => {
      loadings.value.income_type_fetch = false;
    });
};
</script>
