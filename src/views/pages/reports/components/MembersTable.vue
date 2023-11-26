<template>
  <DataTable
    table-style="min-width: 50rem"
    ref="membersTbl"
    :value="members?.data"
    :loading="loadings.table"
    export-filename="members-summary"
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
        <div class="flex gap-2">
          <Button
            type="button"
            icon="pi pi-download"
            label="Export"
            class="p-button-outlined mb-2"
            size="small"
            @click="($refs as any)?.membersTbl?.exportCSV()"
          />
        </div>

        <div class="grid gap-1 m-0 align-items-start ml-auto">
          <Dropdown
            showClear
            v-model="filters.status"
            :options="statuses"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select Status"
            style="min-width: 10rem"
            @change="loadTable()"
          >
          </Dropdown>

          <span class="p-input-icon-left mb-2">
            <i class="pi pi-search" />
            <InputText
              v-model="filters.keyword"
              placeholder="Keyword Search"
              style="width: 100%"
              @keydown.enter="loadTable()"
            />
          </span>
        </div>
      </div>
    </template>

    <Column
      field="member_number"
      header="Member #"
    ></Column>

    <Column
      field="full_name"
      header="Name"
    >
    </Column>

    <Column
      field="share_capital_amount"
      header="Share Capital"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.share_capital_amount) }}
      </template>
    </Column>

    <Column
      field="mortuary_contributions"
      header="Mortuary Contributions"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.mortuary_contributions) }}
      </template>
    </Column>

    <Column
      field="pending_loan_count"
      header="Pending Loan #"
    >
    </Column>

    <Column
      field="active_loan_count"
      header="Active Loan #"
    >
    </Column>

    <Column
      field="closed_loan_count"
      header="Closed Loan #"
    >
    </Column>

    <Column
      field="guarantored_count"
      header="Guarantee Loan #"
    >
    </Column>

    <template #empty> No records found. </template>
  </DataTable>
</template>

<script setup lang="ts">
import useAlert from '@/composables/useAlert';
import useTableParameters from '@/composables/useTableParameters';
import { MEMBER_STATUSES } from '@/constants/ui/members';
import { formatCurrency } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import type { MembersAllTimeReportResponse } from '@/types/api/reports';
import type { AxiosError } from 'axios';
import Button from 'primevue/button';
import { onMounted, ref, watch } from 'vue';

interface Props {
  reload?: boolean;
}

const filters = ref({
  status: '',
  keyword: '',
  others: undefined,
});

const props = defineProps<Props>();
const statuses = ref(MEMBER_STATUSES);

const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);

const loadings = ref({
  table: false,
});

const { showApiError } = useAlert();

const members = ref<MembersAllTimeReportResponse>();

watch(params, () => {
  loadTable();
});

watch(
  () => props.reload,
  (value) => {
    if (value) loadTable();
  }
);

onMounted(() => {
  loadTable();
});

const loadTable = async () => {
  loadings.value.table = true;
  ReportsService.members(params.value)
    .then(({ data }) => {
      members.value = data;
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
