<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Member Loans">
          <Button
            icon="pi pi-plus"
            label="Apply Loan"
            @click="modalsVisibility.apply_form = true"
          ></Button>
        </PageContentHeader>

        <LoansTable
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
                icon="pi pi-eye"
                v-tooltip="'View'"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />

              <Button
                icon="pi pi-pencil"
                v-tooltip="'Edit'"
                severity="warning"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />

              <Button
                v-if="[MemberLoanStatus.PENDING,MemberLoanStatus.EVAULUATION, MemberLoanStatus.PRE_APPROVED].includes(slotProps.data.status as MemberLoanStatus)"
                icon="pi pi-thumbs-down-fill"
                v-tooltip="'Reject'"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                severity="danger"
                @click="handleViewLoanClick(slotProps.data)"
              />

              <Button
                v-if="slotProps.data.status === MemberLoanStatus.PENDING"
                v-tooltip="'Pre-Approved'"
                icon="pi pi-check"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />
              <Button
                v-if="slotProps.data.status === MemberLoanStatus.PRE_APPROVED"
                icon="pi pi-thumbs-up-fill"
                v-tooltip="'Approved'"
                text
                raised
                rounded
                class="mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />
            </div>
          </template>
        </LoansTable>

        <LoanSave v-model:visible="modalsVisibility.apply_form" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import LoanSave from '@components/LoanSave.vue';
import type { MemberLoanTable } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanService from '@/service/LoanService';
import { MemberLoanStatus } from '@/constants/ui/members';
import LoansTable from '@/components/LoansTable.vue';

interface ModalsVisibility {
  apply_form: boolean;
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
  view_loan: false,
});
const loans = ref<MemberLoanTable[]>([]);
const selected_loan = ref<MemberLoanTable | undefined>();

onMounted(() => {
  list();
});

const list = async () => {
  const { data } = await LoanService.list({});
  loans.value = data;
};
const handleViewLoanClick = (value: MemberLoanTable) => {
  selected_loan.value = value;
  modalsVisibility.value.view_loan = true;
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
