<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from '@/layout/AppMenuItem.vue';

const model = ref<any>([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Members', icon: 'pi pi-fw pi-id-card', to: '/members/list' },
      { label: 'Users', icon: 'pi pi-fw pi-check-square', to: '/loans/list' },
      { label: 'Loans', icon: 'pi pi-fw pi-bookmark', to: '/loans/list' },
      { label: 'Shared Capitals', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
    ],
  },

  {
    label: 'Administration',
    items: [
      { label: 'Loan Types', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
      { label: 'Account Types', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },

      {
        label: 'PrimeFlex',
        icon: 'pi pi-fw pi-desktop',
        url: 'https://www.primefaces.org/primeflex/',
        target: '_blank',
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template
      v-for="(item, i) in model"
      :key="item"
    >
      <AppMenuItem
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></AppMenuItem>
      <li
        v-if="item.separator"
        class="menu-separator"
      ></li>
    </template>
    <li>
      <a
        href="https://www.primefaces.org/primeblocks-vue/#/"
        target="_blank"
      >
        <img
          src="/layout/images/banner-primeblocks.png"
          alt="Prime Blocks"
          class="w-full mt-3"
        />
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
