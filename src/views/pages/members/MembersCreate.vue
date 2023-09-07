<script setup lang="ts">
import { ROUTE_NAME_MEMBERS } from '@/constants/routes';
import Button from 'primevue/button';
import router from '@/router';
import MembersForm from './components/MembersForm.vue';
import PageContentHeader from '@components/PageContentHeader.vue';
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Add New Member">
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            @click="router.push({ name: ROUTE_NAME_MEMBERS })"
          ></Button>
        </PageContentHeader>

        <MembersForm />

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
