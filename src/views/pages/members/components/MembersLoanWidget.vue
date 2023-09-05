<template>
  <div class="grid">
    <div
      v-for="(value, index) in loans"
      class="col-3"
      :key="index"
    >
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">{{ value.type }} <small>1%</small></span>

            <div class="text-900 font-medium text-xl">{{ value.currency }} {{ formatNumber(value.balance) }}</div>
            <small>Outstanding</small>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">Paid {{ value.paid }} </span>
        <span class="text-500"> out of {{ value.terms }} Mos. Term</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MemberLoanWidgetItem } from '@/constants/ui/members';

interface Props {
  loans?: MemberLoanWidgetItem[];
}

defineProps<Props>();

const formatNumber = (value: number): string => {
  return Number(value.toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2,
  });
};
</script>
