<template>
  <div class="p-datatable-wrapper">
    <table
      class="p-datatable-table"
      :class="tableClass"
    >
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
          <td class="pb-2 pt-1 vertical-align-top">
            <Skeleton
              v-if="loading"
              class="w-full"
            ></Skeleton>
            <span v-else>{{ display(value.value) }}</span>
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
  tableClass?: string;
}

defineProps<Props>();

const display = (value: string | string[]) => {
  let t: string[] = [];
  if (typeof value === 'string') t.push(value);
  else t = [...value];
  return t.map((r) => (!isEmptyText(r) ? r : '---')).join(' ');
};
</script>
