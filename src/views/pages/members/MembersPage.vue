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
          scrollable
          :loading="loadings.table"
          :paginator="true"
          :row-hover="true"
          :rows="10"
          :value="members"
          class="p-datatable-gridlines"
          data-key="id"
          filter-display="menu"
          responsive-layout="scroll"
          @row-click="handleNavigateView"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                size="small"
                @click="clearFilters()"
              />

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <Dropdown
                  :options="statuses"
                  filter
                  option-value="value"
                  optionLabel="label"
                  placeholder="Select Status"
                  v-model="filters.status"
                  style="min-width: 10rem"
                >
                </Dropdown>

                <span class="p-input-icon-left mb-2">
                  <i class="pi pi-search" />
                  <InputText
                    placeholder="Keyword Search"
                    style="width: 100%"
                    v-model="filters.keyword"
                  />
                </span>
              </div>
            </div>
          </template>
          <template #empty> No members found. </template>
          <template #loading> Loading members data. Please wait. </template>
          <Column
            field="id"
            header="ID Number"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="name"
            header="Name"
            style="min-width: 12rem"
            sortable
          >
          </Column>

          <Column
            field="email"
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
            field="joined"
            header="Joined"
            style="min-width: 12rem"
          >
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
            alignFrozen="right"
            style="min-width: 12rem"
            frozen
          >
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button
                  label="View"
                  icon="pi pi-eye"
                  class="p-button-raised mr-2 mb-2"
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
import { ref, onBeforeMount } from 'vue';
import Button from 'primevue/button';
import router from '@/router';
import { ROUTE_NAME_MEMBERS_CREATE, ROUTE_NAME_MEMBERS_VIEW } from '@/constants/routes';
import PageContentHeader from '../../components/PageContentHeader.vue';
import MembersService from '@/service/MembersService';
import type { MembersTable } from '@/types/ui/members';
import Tag from 'primevue/tag';
import { MemberStatus, MEMBER_STATUSES } from '@/constants/ui/members';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

interface PageLoadings {
  table: boolean;
}
const members = ref<MembersTable[]>();
const filters = ref({
  status: '',
  keyword: '',
});
const loadings = ref<PageLoadings>({
  table: false,
});

const statuses = ref(MEMBER_STATUSES);

onBeforeMount(async () => {
  members.value = await MembersService.getMembers();
});

const handleNavigateView = (event: any) => {
  router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: event.data.id } });
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
