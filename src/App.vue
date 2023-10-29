<template>
  <div
    v-if="isMaintenance"
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="flex align-items-center flex-column">
        <img
          src="/images/logo.png"
          alt="under-maintenance"
          class="w-3"
        />
        <h2>Website under maintenance</h2>
        <p>The website is currently undergoing maintenance. We should be back shortly.</p>
      </div>
    </div>
  </div>

  <div
    v-if="loadings.initialize"
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <ProgressSpinner />
    </div>
  </div>

  <div v-show="!loadings.initialize && !isMaintenance">
    <router-view />
    <Toast position="top-right" />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { computed, onMounted, ref } from 'vue';
import { Idle } from 'idlejs';
import AuthService from './service/AuthService';
import useAlert from './composables/useAlert';
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from 'vuex';

const store = useStore();
const isMaintenance = computed(() => store?.state.system.isMaintenance);

const { showWarning } = useAlert();
const loadings = ref({
  initialize: true,
});

onMounted(() => {
  setLoader();
  new Idle()
    .whenNotInteractive()
    .within(10)
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

const setLoader = () => {
  setTimeout(() => {
    loadings.value.initialize = false;
  }, 2500);
};
</script>
