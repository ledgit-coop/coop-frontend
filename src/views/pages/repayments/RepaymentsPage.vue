<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Repayments" />

        <Cone />
        <MemberLoansRepaymentTable
          :model-value="loans"
          @on-loan-click="handleViewLoanClick"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                size="small"
              />

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

          <template #action="slotProps">
            <div class="flex gap-2">
              <Button
                label="Pay"
                icon="pi pi-eye"
                class="p-button-raised mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />
            </div>
          </template>
        </MemberLoansRepaymentTable>

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
import MemberLoansRepaymentTable from '@/components/MemberLoansRepaymentTable.vue';
import RepaymentCreate from './RepaymentCreate.vue';
import Cone from './test-validation/Cone.vue';

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
