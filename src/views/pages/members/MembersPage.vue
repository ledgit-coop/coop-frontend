<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Members">
          <Button
            icon="pi pi-plus"
            label="Add Member"
            @click="router.push({ name: ROUTE_NAME_MEMBERS_CREATE })"
          ></Button>
        </PageContentHeader>

        <DataTable
          ref="table"
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :value="members"
          class="p-datatable-gridlines"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          @row-click="handleNavigateView"
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

                <Button
                  type="button"
                  icon="pi pi-download"
                  label="Export"
                  class="p-button-outlined mb-2"
                  size="small"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <Dropdown
                  v-model="filters.status"
                  :options="statuses"
                  filter
                  option-value="value"
                  option-label="label"
                  placeholder="Select Status"
                  style="min-width: 10rem"
                  @change="loadTable(params)"
                >
                </Dropdown>

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
          <template #empty> No members found. </template>
          <Column
            field="member_number"
            header="ID Number"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="full_name"
            header="Name"
            sort-field="first_name"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="email_address"
            header="Email Address"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="gender"
            header="Gender"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="member_at"
            header="Joined"
            style="min-width: 12rem"
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.member_at, DATE_FORMAT) }}
            </template>
          </Column>

          <Column
            field="status"
            header="Status"
            sortable
          >
            <template #body="slotProps">
              <Tag
                v-if="slotProps.data.status == MemberStatus.ACTIVE"
                severity="success"
                value="Active"
              ></Tag>
              <Tag
                v-else-if="slotProps.data.status == MemberStatus.TERMINATED"
                severity="danger"
                value="Terminated"
              ></Tag>
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
                  icon="pi pi-eye"
                  v-tooltip="'View'"
                  text
                  raised
                  rounded
                  class="mr-2 mb-2"
                  size="small"
                  @click="handleNavigateView(slotProps)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from 'primevue/button';
import router from '@/router';
import { ROUTE_NAME_MEMBERS_CREATE, ROUTE_NAME_MEMBERS_VIEW } from '@/constants/routes';
import MembersService from '@/service/MembersService';
import type { MembersTable } from '@/types/ui/members';
import Tag from 'primevue/tag';
import { MemberStatus, MEMBER_STATUSES } from '@/constants/ui/members';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import PageContentHeader from '@/components/PageContentHeader.vue';
import useAlert from '@/composables/useAlert';
import useTableParameters from '@/composables/useTableParameters';
import { DATE_FORMAT } from '@/constants';
import { dateFormat } from '@/helpers';

interface PageLoadings {
  table: boolean;
}

const filters = ref({
  status: '',
  keyword: '',
});

const table = ref();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);
const members = ref<MembersTable[]>();

const loadings = ref<PageLoadings>({
  table: false,
});

const { showApiError } = useAlert();

const statuses = ref(MEMBER_STATUSES);

onMounted(async () => {
  loadTable();
});

watch(params, (params) => {
  loadTable(params);
});

const loadTable = (params?: Record<string, any>) => {
  if (!loadings.value.table) {
    loadings.value.table = true;

    MembersService.getMembers(params)
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

const handleNavigateView = (event: any) => {
  router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: event.data.member_number } });
};

const clearFilters = () => {
  filters.value = {
    status: '',
    keyword: '',
  };
};
</script>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
