<template>
  <DataTable
    ref="table"
    scrollable
    :value="loans"
    :loading="loading"
    export-filename="loan-summary"
    table-style="min-width: 50rem"
  >
    <template #header>
      <div class="flex justify-content-between flex-column sm:flex-row">
        <Button
          type="button"
          icon="pi pi-download"
          label="Export"
          class="p-button-outlined mb-2"
          size="small"
          @click="($refs as any).table.exportCSV()"
        />
      </div>
    </template>

    <template #empty> No records found. </template>

    <Column
      field="released_date"
      header="Released Date"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.date, DATE_FORMAT_DATE) }}
      </template>
    </Column>

    <Column
      field="first_amortization_date"
      header="First Amortization"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.first_amortization_date, DATE_FORMAT_DATE) }}
      </template>
    </Column>

    <Column
      field="maturity_date"
      header="Maturity"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.maturity_date, DATE_FORMAT_DATE) }}
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
      field="payment"
      header="Due"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.payment) }}
      </template>
    </Column>

    <Column
      field="fees"
      header="Fees"
    >
      <template #body="slotProps">
        <template v-if="slotProps.data.fees">
          <div class="flex gap-2 flex-column">
            <small
              v-for="(fee, index) in slotProps.data.fees"
              :key="index"
              >{{ fee.name }}: {{ formatNumber(fee.amount) }}</small
            >
          </div>
        </template>
      </template>
    </Column>

    <Column
      field="released_amount"
      header="Released Amount"
    >
      <template #body="slotProps">
        {{ formatNumber(slotProps.data.released_amount) }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { LoanSummaryTable } from '@/types/ui/loans';
import { DATE_FORMAT_DATE } from '@/constants';
import { dateFormat, formatNumber } from '@/helpers';
import Button from 'primevue/button';

interface Props {
  modelValue?: LoanSummaryTable[];
  loading?: boolean;
}

const props = defineProps<Props>();
const loans = ref<LoanSummaryTable[]>([]);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  loans.value = props.modelValue ?? [];
});

watch(
  () => loans.value,
  (value: LoanSummaryTable[]) => {
    emit('update:modelValue', [value]);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: LoanSummaryTable[] | undefined) => {
    loans.value = value ?? [];
  }
);
</script>
