<template>
  <DataTable
    table-style="min-width: 50rem"
    ref="shareCaptTb"
    :value="accounts"
    :loading="loadings.table"
    export-filename="share-capitals"
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
            @click="($refs as any)?.shareCaptTb?.exportCSV()"
          />
        </div>

        <div class="grid gap-1 m-0 align-items-start ml-auto">
          <Dropdown
            showClear
            filter
            v-model="filters.status"
            option-value="value"
            option-label="label"
            :options="accountStatuses"
            placeholder="Select a Status"
            @change="loadTable"
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
      field="account_number"
      header="Account No."
      sortable
    ></Column>

    <Column
      field="account_holder"
      header="Holder"
    ></Column>

    <Column
      field="type"
      header="Type"
      sortable
    >
      <template #body="slotProps">
        {{ slotProps.data.account?.name }}
      </template>
    </Column>

    <Column
      field="created_at"
      header="Opened Date"
      sortable
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.created_at) }}
      </template>
    </Column>
    <Column
      field="balance"
      header="Current Balance"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.balance) }}
      </template>
    </Column>

    <Column
      field="status"
      sortable
      header="Status"
    >
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.status == AccountStatus.ACTIVE"
          severity="success"
          rounded
          value="Active"
        ></Tag>
        <Tag
          v-if="slotProps.data.status == AccountStatus.DORMANT"
          severity="danger"
          value="Dormant"
          rounded
        ></Tag>
      </template>
    </Column>

    <template #empty> No records found. </template>
  </DataTable>
</template>

<script setup lang="ts">
import useAlert from '@/composables/useAlert';
import useTableParameters from '@/composables/useTableParameters';
import { AccountStatus } from '@/constants/ui/accounts';
import { dateFormat, formatCurrency } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import type { DropdownOption } from '@/types/ui';
import type { MemberAccount } from '@/types/ui/members';
import type { AxiosError } from 'axios';
import Button from 'primevue/button';
import { computed, onMounted, ref, watch } from 'vue';

interface Props {
  reload?: boolean;
}

const filters = ref({
  status: '',
  keyword: '',
  others: undefined,
});

const props = defineProps<Props>();

const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);

const loadings = ref({
  table: false,
});
const accountStatuses = computed<DropdownOption[]>(() => [
  { label: 'Active', value: AccountStatus.ACTIVE },
  { label: 'Dormant', value: AccountStatus.DORMANT },
]);

const { showApiError } = useAlert();

const accounts = ref<MemberAccount[]>();

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
  ReportsService.savingsAccount(params.value)
    .then(({ data }) => {
      accounts.value = data.data;
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
