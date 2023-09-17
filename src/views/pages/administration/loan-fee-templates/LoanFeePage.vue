<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Fees">
          <Button
            icon="pi pi-plus"
            label="Add Fee"
            @click="handleAddClick"
          ></Button>
        </PageContentHeader>
        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="loanFees"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
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
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="name"
            header="Name"
            sort-field="name"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="fee"
            header="Fee"
            sort-field="fee"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="fee_type"
            header="Type"
            sort-field="fee_type"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="fee_method"
            header="Method"
            sort-field="fee_method"
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
          </Column>

          <Column
            field="enabled"
            header="Active"
            style="min-width: 12rem"
            sortable
          >
            <template #body="slotProps">
              <InputSwitch
                v-model="slotProps.data.enabled"
                @change="handleDisableChange(slotProps.data)"
              />
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
                  @click="handleLoanDeleteClick(slotProps.data)"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <LoanFeeSave
          @updated="loadTable(params)"
          :id="selectedFee?.id"
          v-model:visible="modalsVisibility.save_fee"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from 'primevue/button';
import type { LoanFeeTemplate } from '@/types/ui/loan-fee-templates';
import type { LoanFeeListPayload } from '@/types/api/loan-fee-templates';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanFeeSave from './LoanFeeSave.vue';
import DataTable from 'primevue/datatable';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';
import LoanFeeTemplateService from '@/service/LoanFeeTemplateService';

interface ModalsVisibility {
  save_fee: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  save_fee: false,
});

const filters = ref({
  status: '',
  keyword: '',
});
const { showApiError, showSuccess } = useAlert();
const confirm = useConfirm();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);

const loanFees = ref<LoanFeeTemplate[]>();
const selectedFee = ref<LoanFeeTemplate | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
});

watch(params, (params) => {
  loadTable(params);
});

const handleEditClick = (fee: LoanFeeTemplate) => {
  selectedFee.value = fee;
  modalsVisibility.value.save_fee = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
};

const handleAddClick = () => {
  modalsVisibility.value.save_fee = true;
  selectedFee.value = undefined;
};

const loadTable = (params?: LoanFeeListPayload) => {
  if (!loadings.value.table) {
    loadings.value.table = true;
    LoanFeeTemplateService.list(params)
      .then((res) => {
        loanFees.value = res.data.data;
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

const handleDisableChange = async (fee: LoanFeeTemplate) => {
  try {
    await LoanFeeTemplateService.toggle(fee.id);
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const handleLoanDeleteClick = (fee: LoanFeeTemplate) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Loan Fee',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await LoanFeeTemplateService.destroy(fee.id);
        showSuccess('Loan fee successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};
</script>
