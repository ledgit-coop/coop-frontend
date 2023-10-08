<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Accounts">
          <Button
            icon="pi pi-plus"
            label="Add Account"
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
          export-filename="accounts"
          class="p-datatable-gridlines"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          @sort="onSort"
          @page="onPageChange"
          :rowsPerPageOptions="[10, 20, 50, 100]"
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
            field="name"
            header="Name"
          ></Column>
          <Column
            field="type"
            header="Type"
          ></Column>

          <Column
            field="earn_interest_per_anum"
            header="Earn %/Per Anum"
          ></Column>
          <Column
            field="maintaining_balance"
            header="Maintaining Balance"
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

        <AccountsSave
          @updated="loadTable"
          @hide="handleHide"
          :account-id="selected_account?.id"
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
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { dateFormat } from '@/helpers';
import { DATE_TIME_FORMAT } from '@/constants';
import { useConfirm } from 'primevue/useconfirm';
import type { AxiosError } from 'axios';
import type { Account } from '@/types/ui/accounts';
import AccountsService from '@/service/AccountsService';
import AccountsSave from './AccountsSave.vue';

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
const members = ref<Account[]>();
const selected_account = ref<Account | undefined>();
const loadings = ref({
  table: false,
});

onMounted(async () => {
  loadTable();
});

const loadTable = (params?: Record<string, any>) => {
  if (!loadings.value.table) {
    loadings.value.table = true;

    AccountsService.list(params)
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

const handleEditClick = (data: Account) => {
  selected_account.value = data;
  modalsVisibility.value.create = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
  loadTable();
};

const handleDeleteClick = (data: Account) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Account',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await AccountsService.destroy(data.id);
        showSuccess('Account successfully deleted.');
        loadTable(params.value);
      } catch (error) {
        showApiError(error as AxiosError);
      }
    },
  });
};

const handleHide = () => {
  selected_account.value = undefined;
};
</script>
