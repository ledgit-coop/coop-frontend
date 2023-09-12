<template>
  <div class="p-datatable-wrapper">
    <table class="p-datatable-table">
      <tbody class="p-datatable-tbody">
        <tr
          v-for="(value, index) in info"
          :key="index"
        >
          <td
            style="text-wrap: nowrap"
            class="font-medium pb-2 pt-1 vertical-align-top"
          >
            {{ value.label }}:
          </td>
          <td class="pl-5 pb-2 pt-1 vertical-align-top">
            <Skeleton
              v-if="loading"
              class="w-full"
            ></Skeleton>
            <span v-else-if="!isEmptyText(value.value)">{{ value.value }}</span>
            <span v-else>---</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { InformationItem } from '@/types/ui/index';
import { isEmptyText } from '@/helpers';

interface Props {
  info: InformationItem[];
  loading?: boolean;
}

defineProps<Props>();
</script>
