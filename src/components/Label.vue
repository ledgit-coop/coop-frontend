<template>
  <label
    ><slot></slot>&nbsp<span
      v-if="required"
      class="text-red-500"
      >*</span
    >
    <i
      v-if="helpText"
      v-tooltip="helpText"
      class="pi pi-info-circle pr-2 cursor-pointer"
    ></i>
  </label>
</template>
<script setup lang="ts">
interface Props {
  required?: boolean;
  helpText?: string;
}

defineProps<Props>();
</script>
