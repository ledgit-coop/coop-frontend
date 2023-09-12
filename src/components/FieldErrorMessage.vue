<template>
  <small
    class="p-error"
    v-if="validation && validation[field]?.$error"
  >
    {{ validation[field]?.$errors[0].$message.replace('Value', fielName) }}
  </small>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core';
import { computed } from 'vue';

interface Props {
  validation?: Validation;
  field: string;
}

const props = defineProps<Props>();

const fielName = computed(() => {
  const name = props.field.replace(/[-_]/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
});
</script>
