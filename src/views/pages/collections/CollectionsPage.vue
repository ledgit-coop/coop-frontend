<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Collections" />
        <LoansCollectionTable
          :model-value="loans"
          @on-loan-click="handleViewLoanClick"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div class="flex gap-2 m-0">
                <Button
                  type="button"
                  icon="pi pi-filter-slash"
                  label="Clear"
                  class="p-button-outlined mb-2"
                  size="small"
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
                  filter
                  option-value="value"
                  option-label="label"
                  placeholder="Select Status"
                  style="min-width: 10rem"
                >
                </Dropdown>

                <span class="p-input-icon-left mb-2">
                  <i class="pi pi-search" />
                  <InputText
                    placeholder="Keyword Search"
                    style="width: 100%"
                  />
                </span>
              </div>
            </div>
          </template>
        </LoansCollectionTable>

        <RepaymentCreate v-model:visible="modalsVisibility.repay" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import type { MemberLoanTable } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanRepaymentService from '@/service/LoanRepaymentService';
import LoansCollectionTable from '@/components/LoansCollectionTable.vue';

interface ModalsVisibility {
  repay: boolean;
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  repay: false,
  view_loan: false,
});
const loans = ref<MemberLoanTable[]>([]);
const selected_loan = ref<MemberLoanTable | undefined>();

onMounted(() => {
  list();
});

const list = async () => {
  const { data } = await LoanRepaymentService.list({});
  loans.value = data;
};
const handleViewLoanClick = (value: MemberLoanTable) => {
  selected_loan.value = value;
  modalsVisibility.value.repay = true;
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
