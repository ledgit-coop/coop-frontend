<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Product Loans">
          <Button
            icon="pi pi-plus"
            label="Add Product"
            @click="modalsVisibility.create_product = true"
          ></Button>
        </PageContentHeader>

        <LoanProductCreate :visible="modalsVisibility.create_product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Button from 'primevue/button';
import router from '@/router';
import { ROUTE_NAME_MEMBERS_VIEW } from '@/constants/routes';
import MembersService from '@/service/MembersService';
import type { MembersTable } from '@/types/ui/members';
import { MEMBER_STATUSES } from '@/constants/ui/members';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanProductCreate from './LoanProductCreate.vue';

interface PageLoadings {
  table: boolean;
}

interface ModalsVisibility {
  create_product: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  create_product: false,
});

const members = ref<MembersTable[]>();
const filters = ref({
  status: '',
  keyword: '',
});

const loadings = ref<PageLoadings>({
  table: false,
});

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
