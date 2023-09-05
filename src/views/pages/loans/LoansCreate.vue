<script setup lang="ts">
import { ref } from 'vue';
import { ROUTE_NAME_LOANS } from '@/constants/routes';
import PageContentHeader from '@/views/components/PageContentHeader.vue';
import Button from 'primevue/button';
import router from '@/router';
import LoansForm from './components/LoansForm.vue';
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Add New Loan">
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            @click="router.push({ name: ROUTE_NAME_LOANS })"
          ></Button>
        </PageContentHeader>

        <LoansForm />

        <div class="flex">
          <Button
            icon="pi pi-save"
            label="Save"
            class="ml-auto"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
