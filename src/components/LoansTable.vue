<template>
  <div>
    <DataTable
      scrollable
      ref="table"
      :lazy="true"
      :total-records="totalRecords"
      :paginator="true"
      :row-hover="true"
      :value="loans"
      :loading="loading"
      :rows="rows"
      responsive-layout="scroll"
      table-style="min-width: 50rem"
      @sort="emit('sort', $event)"
      @page="emit('page', $event)"
      export-filename="loans"
      :row-class="({ status }) => (status === MemberLoanStatus.OVERDUE ? 'text-red-500' : undefined)"
    >
      <!-- @vue-skip -->
      <template  v-for="(_, name) in $slots" #[name]="slotData">
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
 

      <template #empty> No records found. </template>

      <Column
        v-if="!hideColumns?.includes('member')"
        field="member.full_name"
        header="Member"
        sortable
      >
        <template #body="slotProps">
          <Button
            class="white-space-nowrap"
            :label="slotProps.data.member?.full_name"
            link
            @click="router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: slotProps.data.member_number } })"
          />
        </template>
      </Column>

      <Column
        v-if="!hideColumns?.includes('loan_number')"
        field="loan_number"
        header="Loan No."
        sortable
      >
      </Column>

      <Column
        v-if="!hideColumns?.includes('status')"
        field="status"
        header="Status"
      >
        <template #body="slotProps">
          <LoanStatus :status="slotProps.data.status" />
        </template>
      </Column>
      <Column
        v-if="!hideColumns?.includes('type')"
        field="loan_product.name"
        header="Type"
        class="white-space-nowrap"
        sortable
      ></Column>
      <Column
        v-if="!hideColumns?.includes('applied_date')"
        field="applied_date"
        header="Loan Date"
        class="white-space-nowrap"
      ></Column>

      <Column
        v-if="!hideColumns?.includes('applied_amount')"
        field="applied_amount"
        header="Loan Amount"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.applied_amount ?? 0) }}
        </template>
      </Column>
      <Column
        v-if="!hideColumns?.includes('principal_amount')"
        field="principal_amount"
        header="Approved Amount"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.principal_amount ?? 0) }}
        </template>
      </Column>
      <Column
        v-if="!hideColumns?.includes('loan_interest')"
        field="loan_interest"
        header="Interest"
        class="white-space-nowrap"
      >
        <template #body="slotProps">
          {{ `${slotProps.data.loan_interest} % / ${slotProps.data.loan_interest_period}` }}
        </template>
      </Column>
      <Column
        v-if="!hideColumns?.includes('outstanding_balance')"
        field="outstanding_balance"
        header="Balance"
      ></Column>
      <Column
        v-if="!hideColumns?.includes('action')"
        field="id"
        header="Action"
        align-frozen="right"
        style="min-width: 6rem; width: 6rem"
        frozen
        :exportable="false"
      >
        <template #body="slotProps">
          <slot
            name="action"
            :data="(slotProps.data as Loan)"
          ></slot>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { MemberLoanStatus } from '@/constants/ui/members';
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import { ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import Button from 'primevue/button';
import LoanStatus from './LoanStatus.vue';
import type { Loan } from '@/types/ui/loans';
import { formatCurrency } from '@/helpers';

interface Props {
  hideColumns?: string[];
  modelValue?: Loan[];
  totalRecords?: number;
  rows?: number;
  loading?: boolean;
  download?: boolean;
}

const props = defineProps<Props>();
const loans = ref<Loan[]>([]);
const emit = defineEmits(['update:modelValue', 'sort', 'page', 'update:download']);
const table = ref();
onMounted(() => {
  loans.value = props.modelValue ?? [];
});

watch(
  () => loans.value,
  (value: Loan[]) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: Loan[] | undefined) => {
    loans.value = value ?? [];
  }
);

watch(
  () => props.download,
  (value) => {
    if (value) {
      table.value.exportCSV();
      emit('update:download', false);
    }
  }
);
</script>
