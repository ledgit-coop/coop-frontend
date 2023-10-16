<template>
  <DataTable
    table-style="min-width: 50rem"
    ref="table"
    :value="loans"
    :loading="loadings.table"
    export-filename="loans"
    :lazy="true"
    :rows="rows"
    :paginator="true"
    :total-records="totalRecords"
    :rowsPerPageOptions="[10, 20, 50, 100]"
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
      </div>
    </template>

    <Column
      field="member.full_name"
      header="Member"
    ></Column>

    <Column
      field="loan_number"
      header="Loan No."
    ></Column>

    <Column
      field="loan_product.name"
      header="Loan"
    ></Column>

    <Column
      field="loan_interest"
      header="Interest"
      class="white-space-nowrap"
    >
      <template #body="slotProps">
        {{ `${slotProps.data.loan_interest ?? '---'} % / ${slotProps.data.loan_interest_period ?? '---'}` }}
      </template>
    </Column>

    <Column
      field="released_date"
      header="Released Date"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.released_date, DATE_FORMAT_DATE) }}
      </template>
    </Column>

    <Column
      field="principal_amount"
      header="Approved Amount"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.principal_amount) }}
      </template>
    </Column>

    <template #empty> No records found. </template>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total:"
          :colspan="5"
          footer-style="text-align:right"
        />
        <Column
          class="white-space-nowrap"
          :footer="formatCurrency(loans?.reduce((n, p) => n + Number(p?.principal_amount ?? 0), 0) ?? 0)"
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
import type { Loan } from '@/types/ui/loans';
import type { AxiosError } from 'axios';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';

interface Props {
  dateFrom?: Date;
  dateTo?: Date;
  reload?: boolean;
}

const props = defineProps<Props>();

const filters = computed(() => ({
  from: dateFormat(props.dateFrom, DATE_FORMAT_DB),
  to: dateFormat(props.dateTo, DATE_FORMAT_DB),
}));

const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);

const loadings = ref({
  table: false,
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

const { showApiError } = useAlert();

const loans = ref<Loan[]>([]);

const loadTable = async () => {
  loadings.value.table = true;

  ReportsService.loansReleased(params.value)
    .then(({ data }) => {
      loans.value = data.data;
      paginate(data);
    })
    .catch((error) => {
      showApiError(error as AxiosError);
    })
    .finally(() => {
      loadings.value.table = false;
    });
};
</script>
