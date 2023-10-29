<template>
  <DataTable
    table-style="min-width: 50rem"
    ref="table"
    :value="revenues"
    :loading="loadings.table"
    export-filename="revenues"
    :lazy="true"
    :rows="rows"
    :paginator="true"
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
        <Button
          type="button"
          icon="pi pi-download"
          label="Export"
          class="p-button-outlined mb-2"
          size="small"
          @click="($refs as any)?.table?.exportCSV()"
        />

        <div class="grid gap-1 m-0 align-items-start ml-auto">
          <Dropdown
            showClear
            filter
            option-value="value"
            option-label="label"
            v-model="filters.transaction_sub_type_id"
            @change="loadTable()"
            :loading="loadings.income_type_fetch"
            placeholder="Select Type of Income"
            :options="incomeType"
          >
          </Dropdown>
        </div>
      </div>
    </template>

    <Column
      field="transaction_number"
      header="#"
    ></Column>

    <Column
      field="particular"
      header="Particular"
    ></Column>

    <Column
      field="transaction_date"
      header="Date"
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
      field="amount"
      header="Amount"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.amount) }}
      </template>
    </Column>
    <template #empty> No records found. </template>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total:"
          :colspan="4"
          footer-style="text-align:right"
        />
        <Column
          class="white-space-nowrap"
          :footer="formatCurrency(revenues?.reduce((n, p) => n + Number(p?.amount ?? 0), 0) ?? 0)"
        />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>

<script setup lang="ts">
import useAlert from '@/composables/useAlert';
import useTableParameters from '@/composables/useTableParameters';
import { DATE_FORMAT_DATE, DATE_FORMAT_DB } from '@/constants';
import { dateFormat, formatCurrency } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import UtilityService from '@/service/UtilityService';
import type { DropdownOption } from '@/types/ui';
import type { Transaction } from '@/types/ui/transactions';
import type { AxiosError } from 'axios';
import Button from 'primevue/button';
import { computed, onMounted, ref, watch } from 'vue';

interface Props {
  dateFrom?: Date;
  dateTo?: Date;
  reload?: boolean;
}

const props = defineProps<Props>();
const incomeType = ref<DropdownOption[]>([]);
const filters = computed(() => ({
  from: dateFormat(props.dateFrom, DATE_FORMAT_DB),
  to: dateFormat(props.dateTo, DATE_FORMAT_DB),
  transaction_sub_type_id: undefined,
}));

const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);

const loadings = ref({
  table: false,
  income_type_fetch: false,
});

watch(params, () => {
  if (props.dateFrom && props.dateTo) loadTable();
});

watch(
  () => props.reload,
  (value) => {
    if (value && props.dateFrom && props.dateTo) loadTable();
  }
);

onMounted(() => {
  loadIncomeSubTypes();
});

const { showApiError } = useAlert();

const revenues = ref<Transaction[]>([]);

const loadTable = async () => {
  loadings.value.table = true;
  ReportsService.revenues(params.value)
    .then(({ data }) => {
      revenues.value = data.data;

      paginate(data);
    })
    .catch((error) => {
      showApiError(error as AxiosError);
    })
    .finally(() => {
      loadings.value.table = false;
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
