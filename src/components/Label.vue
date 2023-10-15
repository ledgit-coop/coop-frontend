<template>
  <label class="flex align-items-center gap-1"
    ><slot></slot>&nbsp<span
      v-if="required"
      class="text-red-500"
      >*</span
    >
    <i
      v-if="helpText"
      v-tooltip="helpText"
      class="pi pi-info-circle pr-2 cursor-pointer"
      :class="severityClass"
    ></i>
  </label>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  required?: boolean;
  helpText?: string;
  helpTextSeverity?: undefined | 'warning' | 'danger' | 'success';
}

const props = defineProps<Props>();

const severityClass = computed(() => {
  let severity = '';
  switch (props.helpTextSeverity) {
    case 'danger':
      severity = 'text-red-500';
      break;

    case 'success':
      severity = 'text-green-500';
      break;
    case 'warning':
      severity = 'text-yellow-500';
      break;
  }
  return severity;
});
</script>
