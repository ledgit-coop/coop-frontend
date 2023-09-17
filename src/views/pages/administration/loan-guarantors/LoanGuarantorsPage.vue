<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Guarantors">
          <Button
            icon="pi pi-plus"
            label="Add Guarantor"
            @click="modalsVisibility.create = true"
          ></Button>
        </PageContentHeader>

        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="members"
          export-filename="guarantors"
          class="p-datatable-gridlines"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          @sort="onSort"
          @page="onPageChange"
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
                  @click="$refs.table.exportCSV()"
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
            field="first_name"
            header="First Name"
          ></Column>
          <Column
            field="middle_name"
            header="Middle Name"
          ></Column>

          <Column
            field="last_name"
            header="Last Name"
          ></Column>
          <Column
            field="contact"
            header="Contact"
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
            header="Action"
            align-frozen="right"
            style="min-width: 12rem"
            :exportable="false"
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
                  @click="handleDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <LoanGuarantorsSave
          @updated="loadTable"
          @hide="handleHide"
          :guarantor-id="selected_guarantor?.id"
          v-model:visible="modalsVisibility.create"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanGuarantorsService from '@/service/LoanGuarantorsService';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { dateFormat } from '@/helpers';
import { DATE_TIME_FORMAT } from '@/constants';
import LoanGuarantorsSave from './LoanGuarantorsSave.vue';
import type { LoanGuarantorsTable } from '@/types/ui/loan-guarantors';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';

interface ModalsVisibility {
  create: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  create: false,
});

const filters = ref({
  status: '',
  keyword: '',
});

const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const members = ref<LoanGuarantorsTable[]>();
const selected_guarantor = ref<LoanGuarantorsTable | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
});

const loadTable = (params?: Record<string, any>) => {
  if (!loadings.value.table) {
    loadings.value.table = true;

    LoanGuarantorsService.list(params)
      .then((res) => {
        members.value = res.data.data;
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

const handleEditClick = (data: LoanGuarantorsTable) => {
  selected_guarantor.value = data;
  modalsVisibility.value.create = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
  loadTable();
};

const handleDeleteClick = (data: LoanGuarantorsTable) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Guarantor',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await LoanGuarantorsService.destroy(data.id);
        showSuccess('Guarantor successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const handleHide = () => {
  selected_guarantor.value = undefined;
};
</script>
