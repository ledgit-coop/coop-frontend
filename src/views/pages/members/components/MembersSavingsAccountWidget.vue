<template>
  <div class="grid">
    <div
      v-for="(value, index) in accounts"
      :key="index"
      class="col-12 sm:col-6 md:col-6 lg:col-4"
    >
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">{{ value.type }} <small>1% p.a</small></span>

            <div class="text-900 font-medium text-xl">{{ value.currency }} {{ formatNumber(value.balance) }}</div>
            <small>Current Balance</small>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-green-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-money-bill text-green-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">Last deposit {{ formatNumber(value.last_deposit_amount) }} </span>
        <span class="text-500"> on {{ value.last_deposit_date }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MemberSavingsAccountWidgetItem } from '@/types/ui/members';

interface Props {
  accounts?: MemberSavingsAccountWidgetItem[];
}

defineProps<Props>();

const formatNumber = (value: number): string => {
  return Number(value.toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2,
  });
};
</script>
