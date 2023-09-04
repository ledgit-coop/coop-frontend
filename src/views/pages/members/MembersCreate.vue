<script setup>
import { ref } from 'vue';
import { ROUTE_NAME_MEMBERS } from '@/constants/routes';
import PageContentHeader from '../../components/PageContentHeader.vue';
import Button from 'primevue/button';
import router from '@/router';
import MembersForm from './components/MembersForm.vue';
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
      </div>
    </div>
  </div>
</template>
