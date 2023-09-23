<template>
  <router-view />
  <Toast position="top-right" />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { onMounted } from 'vue';
import { Idle } from 'idlejs';
import AuthService from './service/AuthService';
import useAlert from './composables/useAlert';

const { showWarning } = useAlert();
onMounted(() => {
  new Idle()
    .whenNotInteractive()
    .within(5)
    .do(() => {
      if (AuthService.isAuthenticated()) {
        showWarning('You will be logged out in 3 seconds due to inactivity.');
        setTimeout(() => {
          AuthService.logout(true);
        }, 3000);
      }
    })
    .start();
});
</script>
