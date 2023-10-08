<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Users">
          <Button
            icon="pi pi-plus"
            label="Add User"
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
          export-filename="users"
          class="p-datatable-gridlines"
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
            field="email"
            header="Email"
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
            frozen
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button
                  label="Edit"
                  icon="pi pi-eye"
                  class="p-button-raised mr-2 mb-2"
                  size="small"
                  @click="handleEditClick(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <UsersSave
          @updated="loadTable"
          :user-id="selected_member?.id"
          v-model:visible="modalsVisibility.create"
          @hide="handleHide"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@/components/PageContentHeader.vue';
import UsersService from '@/service/UsersService';
import type { UsersTable } from '@/types/ui/user';
import useTableParameters from '@/composables/useTableParameters';
import useAlert from '@/composables/useAlert';
import { dateFormat } from '@/helpers';
import { DATE_TIME_FORMAT } from '@/constants';
import UsersSave from './UsersSave.vue';

interface PageLoadings {
  table: boolean;
}

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
const { showApiError } = useAlert();

const members = ref<UsersTable[]>();
const selected_member = ref<UsersTable | undefined>();
const loadings = ref<PageLoadings>({
  table: false,
});

onMounted(async () => {
  loadTable();
});

const loadTable = (params?: Record<string, any>) => {
  if (!loadings.value.table) {
    loadings.value.table = true;

    UsersService.list(params)
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

const handleEditClick = (data: UsersTable) => {
  selected_member.value = data;
  modalsVisibility.value.create = true;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
  loadTable();
};

const handleHide = () => {
  selected_member.value = undefined;
};
</script>
