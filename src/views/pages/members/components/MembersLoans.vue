<template>

<PageContentHeader
    class="mt-5"
    title="Active Loans"
    size="h5"
  >
    
  </PageContentHeader>

  <MembersLoanWidget
    v-if="loans.length > 1"
    :loans="loans"
  />

  <PageContentHeader
    class="mt-5"
    title="History"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      optionLabel="label"
      placeholder="Select Loan"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      optionLabel="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <DataTable
    :value="history"
    tableStyle="min-width: 50rem"
  >
    <Column
      field="loan_number"
      header="Loan No."
      sortable
    ></Column>
    <Column
      field="status"
      sortable
      header="Status"
    >
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.status == MemberLoanStatus.APPROVED"
          severity="success"
          rounded
          value="Approved"
        ></Tag>
        <Tag
          v-if="slotProps.data.status == MemberLoanStatus.EVAULUATION"
          severity="info"
          value="Under evaluation"
          rounded
        ></Tag>
        <Tag
        :style="{ background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)' }"
          v-if="slotProps.data.status == MemberLoanStatus.PAID"
          severity="info"
          value="Fully Paid"
          rounded
        ></Tag>
        <Tag
          v-if="slotProps.data.status == MemberLoanStatus.PENDING"
          severity="warning"
          value="Pending"
          rounded
        ></Tag>
        <Tag
          v-else-if="slotProps.data.status == MemberLoanStatus.REJECTED"
          severity="danger"
          rounded
          value="Rejected"
        ></Tag>
      </template>
    </Column>
    <Column
      field="type"
      header="Type"
      sortable
    ></Column>
    <Column
      field="loan_date"
      header="Loan Date"
      sortable
    ></Column>
    <Column
      field="loan_amount"
      header="Loan Amount"
    ></Column>
    <Column
      field="approved_amount"
      header="Approved Amount"
    ></Column>
    <Column
      field="interest_rate"
      header="Interest Rate (%)"
    ></Column>
    <Column
      field="outstanding_balance"
      header="Outstanding Balance"
    ></Column>
    <Column
      field="id"
      header="Action"
    >
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <Button
            label="View"
            icon="pi pi-eye"
            class="p-button-raised mr-2 mb-2"
            size="small"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import { onMounted, ref } from 'vue';
import MembersLoanWidget from './MembersLoanWidget.vue';
import type { MemberLoanWidgetItem, MemberLoanHistory } from '@/types/ui/members';
import MembersService from '@/service/MembersService';
import PageContentHeader from '@/views/components/PageContentHeader.vue';
import { MemberLoanStatus } from '@/constants/ui/members';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

const history = ref<MemberLoanHistory[]>();
const loans = ref<MemberLoanWidgetItem[]>([
  {
    type: 'Salary Loan',

    balance: 202040.2,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
  {
    type: 'Emergency Loan',

    balance: 200000,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
]);

onMounted(async () => {
  history.value = await MembersService.getMemberLoanHistory('12');
});
</script>
