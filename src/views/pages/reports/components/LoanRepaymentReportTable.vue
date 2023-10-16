<template>
  <DataTable
    table-style="min-width: 50rem"
    ref="shareCaptTb"
    :value="repayments"
    :loading="loadings.table"
    export-filename="share-capitals"
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
          @click="($refs as any)?.shareCaptTb?.exportCSV()"
        />
      </div>
    </template>

    <Column
      field="transaction_number"
      header="#"
    ></Column>

    <Column
      field="particular"
      header="Member"
    >
      <template #body="slotProps">
        {{ slotProps.data.member_account.member.full_name }}
      </template>
    </Column>

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
          :footer="formatCurrency(repayments?.reduce((n, p) => n + Number(p?.amount ?? 0), 0) ?? 0)"
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
import type { AccountTransaction } from '@/types/ui/accounts';
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

const repayments = ref<AccountTransaction[]>([]);

const loadTable = async () => {
  loadings.value.table = true;
  ReportsService.loansRepayments(params.value)
    .then(({ data }) => {
      repayments.value = data.data;
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
