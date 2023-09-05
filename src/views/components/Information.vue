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
            class="font-medium pb-1 pt-1 vertical-align-top"
          >
            {{ value.label }}:
          </td>
          <td class="pl-5 pb-1 pt-1 vertical-align-top">
            {{ value.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { InformationItem } from '@/constants/ui/index';

interface Props {
  info: InformationItem[];
}

defineProps<Props>();
</script>
