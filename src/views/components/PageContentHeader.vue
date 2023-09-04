<template>
  <div class="mb-3 flex gap-3 align-items-center">
    <h5 class="m-0">{{ title }}</h5>
    <div class="ml-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Header',
});
</script>
