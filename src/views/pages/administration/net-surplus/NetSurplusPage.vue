<template>
  <div class="grid">
    <div class="col-12">
      <InlineMessage
        class="w-full"
        severity="warn"
        >This area is still on development</InlineMessage
      >

      <div class="card">
        <PageContentHeader title="Net Surplus">
          <Button
            icon="pi pi-plus"
            label="Generate Net Surplus"
            @click="modalsVisibility.create = true"
          ></Button>
        </PageContentHeader>

        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="netSurpluses"
          export-filename="net-surplus"
          class="p-datatable-gridlines"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          @sort="onSort"
          @page="onPageChange"
          @update:rows="onRowsChange"
          :rowsPerPageOptions="[10, 20, 50, 100, 500, 1000]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #empty> No records found. </template>

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
                  @click="($refs as any).table.exportCSV()"
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
          <Column
            field="id"
            header="ID"
          ></Column>
          <Column
            field="from_date"
            header="From"
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.from_date, DATE_FORMAT_DATE) }}
            </template>
          </Column>
          <Column
            field="to_date"
            header="To"
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.to_date, DATE_FORMAT_DATE) }}
            </template>
          </Column>

          <Column
            field="interest_on_share_capital"
            header="Alloc. Int. Share Cap."
          ></Column>

          <Column
            field="patronage_refund"
            header="Alloc. Pat. Refund"
          ></Column>

          <Column
            field="net_surplus_allocated_distributed"
            header="Net Surplus Allocated"
          ></Column>

          <Column
            field="interest_on_share_capital_rate_interest"
            header="Share Cap. %"
          ></Column>

          <Column
            field="patronage_refund_rate_interest"
            header="Pat. Refund %"
          ></Column>
          <Column
            field="created_at"
            header="Created At"
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.created_at, DATE_TIME_FORMAT) }}
            </template>
          </Column>

          <Column
            field="id"
            class="froze-right"
            header="Action"
            align-frozen="right"
            style="min-width: 12rem"
            :exportable="false"
            frozen
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button
                  icon="pi pi-eye"
                  v-tooltip="'Edit'"
                  text
                  raised
                  rounded
                  class="mr-2 mb-2"
                  size="small"
                  @click="handleEditClick(slotProps.data)"
                />
                <Button
                  :disabled="slotProps.data.locked"
                  icon="pi pi-trash"
                  v-tooltip="'Delete'"
                  text
                  raised
                  severity="danger"
                  rounded
                  class="mr-2 mb-2"
                  @click="handleDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <NetSurplusSave
          @updated="loadTable"
          @hide="handleHide"
          v-model:visible="modalsVisibility.create"
        />
        <NetSurplusView
          @updated="loadTable"
          @hide="handleHide"
          v-model:visible="modalsVisibility.view"
          :net-surplus-id="selectedNetSurplus?.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@/components/PageContentHeader.vue';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { dateFormat } from '@/helpers';
import { DATE_FORMAT_DATE, DATE_TIME_FORMAT } from '@/constants';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';
import NetSurplusSave from './NetSurplusSave.vue';
import NetSurplusView from './NetSurplusView.vue';
import type { NetSurplus } from '@/types/ui/net-surplus';
import NetSurplusService from '@/service/NetSurplusService';
import InlineMessage from 'primevue/inlinemessage';

interface ModalsVisibility {
  create: boolean;
  view: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  create: false,
  view: false,
});

const filters = ref({
  status: '',
  keyword: '',
});

const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const netSurpluses = ref<NetSurplus[]>();
const selectedNetSurplus = ref<NetSurplus | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
});

const loadTable = (params?: Record<string, any>) => {
  if (!loadings.value.table) {
    loadings.value.table = true;

    NetSurplusService.list(params)
      .then((res) => {
        netSurpluses.value = res.data.data;
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

const handleEditClick = (data: NetSurplus) => {
  selectedNetSurplus.value = data;
  modalsVisibility.value.view = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
  loadTable();
};

const handleDeleteClick = (data: NetSurplus) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete net surplus',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await NetSurplusService.destroy(data.id);
        showSuccess('Net surplus successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const handleHide = () => {
  selectedNetSurplus.value = undefined;
};
</script>
