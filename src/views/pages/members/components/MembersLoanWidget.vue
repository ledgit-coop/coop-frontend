<template>
  <div class="grid">
    <div
      v-for="(value, index) in loans"
      :key="index"
      class="col-12 sm:col-6 md:col-6 lg:col-4"
    >
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >{{ value.type }} <small>{{ terms(value) }}</small></span
            >

            <div class="text-900 font-medium text-xl">{{ value.currency }} {{ formatNumber(value.balance) }}</div>
            <small>Outstanding</small>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-history text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">Paid {{ value.paid }} </span>
        <span class="text-500"> out of {{ value.number_of_repayments }} Repayments</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LoanInterestType } from '@/constants/ui/loans';
import type { MemberLoanWidgetItem } from '@/types/ui/members';

interface Props {
  loans?: MemberLoanWidgetItem[];
}

defineProps<Props>();

const formatNumber = (value: number): string => {
  return Number(value.toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2,
  });
};

const terms = (loan: MemberLoanWidgetItem) => {
  return `${loan.interest.toString()}% ${
    loan.interest_type === LoanInterestType.PERCENTAGE_BASE ? 'percent' : 'fix amount'
  }`;
};
</script>
