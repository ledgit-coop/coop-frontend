<template>
  <div class="col-12">
    <PageContentHeader
      title="Fees"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12 lg:col-6">
    <label for="name">Share Capital (Fixed)</label>
    <InputText placeholder="Fixed Amount" />
  </div>

  <div class="field col-12 lg:col-6">
    <label for="name">Processing Fee (Percentage)</label>

    <span class="p-input-icon-right">
      <i class="pi pi-percentage" />
      <InputText placeholder="Percentage" />
    </span>
  </div>
</template>

<script setup lang="ts">
import type InputText from 'primevue/inputtext';
import PageContentHeader from './PageContentHeader.vue';
</script>
