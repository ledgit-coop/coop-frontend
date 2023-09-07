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

        <MemberLoansTable @on-loan-click="handleViewLoanClick">
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
            <div class="flex flex-wrap gap-2">
              <Button
                label="View"
                icon="pi pi-eye"
                class="p-button-raised mr-2 mb-2"
                size="small"
                @click="handleViewLoanClick(slotProps.data)"
              />
            </div>
          </template>
        </MemberLoansTable>

        <MembersLoanView
          v-model:visible="modalsVisibility.view_loan"
          :loan_id="selected_loan?.id"
        />
        <ApplyLoan v-model:visible="modalsVisibility.apply_form" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import ApplyLoan from '@components/ApplyLoan.vue';
import type { MemberLoanTable } from '@/types/ui/members';
import MembersLoanView from '@/components/MembersLoanView.vue';
import MemberLoansTable from '@components/MemberLoansTable.vue';
import PageContentHeader from '@components/PageContentHeader.vue';

interface ModalsVisibility {
  apply_form: boolean;
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
  view_loan: false,
});

const selected_loan = ref<MemberLoanTable | undefined>();

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
