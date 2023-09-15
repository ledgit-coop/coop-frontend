<template>
  <DataTable
    scrollable
    :value="loans"
    :loading="loading"
    table-style="min-width: 50rem"
  >
    <!-- Inheret template -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <template #empty> No records found. </template>
    <template #loading> Loading records. Please wait. </template>

    <Column
      field="month"
      header="#"
    ></Column>

    <Column
      field="date"
      header="Due Date"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.date, DATE_FORMAT_DATE) }}
      </template>
    </Column>

    <Column
      field="principal"
      header="Principal Amount"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.principal) }}
      </template>
    </Column>

    <Column
      field="interest"
      header="Interest Amount"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.interest) }}
      </template>
    </Column>

    <Column
      field="total_payment"
      header="Due Payment"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.total_payment) }}
      </template>
    </Column>

    <Column
      field="loan_balance"
      header="Loan Balance"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.loan_balance) }}
      </template>
    </Column>

    <Column
      field="description"
      header="Description"
    >
    </Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total"
          :colspan="2"
          footer-style="text-align:right"
        />
        <Column :footer="formatNumber(loanCalculator?.total_principal ?? 0)" />
        <Column :footer="formatNumber(loanCalculator?.total_interest ?? 0)" />
        <Column
          :footer="formatNumber(loanCalculator?.total_payment ?? 0)"
          :colspan="3"
        />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { LoanCalculator, LoanSchedule } from '@/types/ui/loans';
import { DATE_FORMAT_DATE } from '@/constants';
import { dateFormat, formatNumber } from '@/helpers';

interface Props {
  hideColumns?: string[];
  modelValue?: LoanSchedule[];
  loading?: boolean;
  loanCalculator?: LoanCalculator;
}

const props = defineProps<Props>();
const loans = ref<LoanSchedule[]>([]);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  loans.value = props.modelValue ?? [];
});

watch(
  () => loans.value,
  (value: LoanSchedule[]) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: LoanSchedule[] | undefined) => {
    loans.value = value ?? [];
  }
);
</script>
