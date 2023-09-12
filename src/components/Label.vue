<template>
  <label
    ><slot></slot>&nbsp<span
      v-if="required"
      class="text-red-500"
      >*</span
    ></label
  >
</template>
<script setup lang="ts">
interface Props {
  required?: boolean;
}

defineProps<Props>();
</script>
