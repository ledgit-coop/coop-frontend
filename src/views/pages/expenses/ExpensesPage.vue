<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Expenses">
          <Button
            icon="pi pi-plus"
            label="Add Expenses"
            @click="handleAddClick"
          ></Button>
        </PageContentHeader>
        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="expenses"
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

          <Column
            field="id"
            header="ID"
            style="min-width: 5rem"
            sortable
          >
          </Column>

          <Column
            field="transaction_number"
            header="Transaction #"
            sort-field="transaction_number"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="amount"
            header="Amount"
            sort-field="amount"
            style="min-width: 12rem"
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
            sortable
          >
          </Column>
          <Column
            field="transaction_date"
            header="Date"
            style="min-width: 12rem"
            sortable
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.transaction_date, DATE_FORMAT) }}
            </template>
          </Column>

          <Column
            field="created_by"
            header="Created By"
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
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.created_at, DATE_TIME_FORMAT) }}
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
                  @click="handleExpenseDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <ExpenseSave
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
import ExpenseSave from './ExpenseSave.vue';
import DataTable from 'primevue/datatable';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';
import type { Transaction } from '@/types/ui/transactions';
import ExpensesService from '@/service/ExpensesService';
import type { ExpensesListPayload } from '@/types/api/expenses';
import { dateFormat, formatNumber } from '@/helpers';
import { DATE_TIME_FORMAT, DATE_FORMAT } from '@/constants';

interface ModalsVisibility {
  save_transaction: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  save_transaction: false,
});

const filters = ref({
  status: '',
  keyword: '',
});
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);

const expenses = ref<Transaction[]>();
const selectedTransaction = ref<Transaction | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
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
  };
};

const handleAddClick = () => {
  modalsVisibility.value.save_transaction = true;
  selectedTransaction.value = undefined;
};

const loadTable = (params?: ExpensesListPayload) => {
  if (!loadings.value.table) {
    loadings.value.table = true;
    ExpensesService.list(params)
      .then((res) => {
        expenses.value = res.data.data;
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

const handleExpenseDeleteClick = (transaction: Transaction) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Expense',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await ExpensesService.destroy(transaction.id);
        showSuccess('Expense successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};
</script>
