<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from '@/layout/AppMenuItem.vue';
import {
  ROUTE_NAME_LOANS,
  ROUTE_NAME_LOAN_PRODUCTS,
  ROUTE_NAME_MEMBERS,
  ROUTE_NAME_REPAYMENTS,
  ROUTE_NAME_USERS,
} from '@/constants';

const model = ref<any>([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Members', icon: 'pi pi-fw pi-id-card', to: { name: ROUTE_NAME_MEMBERS } },
      { label: 'Loans', icon: 'pi pi-fw pi-history', to: { name: ROUTE_NAME_LOANS } },
      { label: 'Repayments', icon: 'pi pi-fw pi-history', to: { name: ROUTE_NAME_REPAYMENTS } },
      { label: 'Collections', icon: 'pi pi-fw pi-history', to: { name: ROUTE_NAME_LOANS } },
      { label: 'Due & Missed Loans', icon: 'pi pi-fw pi-history', to: { name: ROUTE_NAME_LOANS } },
      { label: 'Share Capitals', icon: 'pi pi-fw pi-globe', to: '/uikit/invalidstate' },
    ],
  },

  {
    label: 'Administration',
    items: [
      { label: 'Users', icon: 'pi pi-fw pi-users', to: { name: ROUTE_NAME_USERS } },
      { label: 'Fees', icon: 'pi pi-fw pi-book', to: '/admin/loan-products' },
      { label: 'Loan Products', icon: 'pi pi-fw pi-book', to: { name: ROUTE_NAME_LOAN_PRODUCTS } },
      { label: 'Account Types', icon: 'pi pi-fw pi-book', to: '/utilities/icons' },
      { label: 'Disbursment Channel', icon: 'pi pi-fw pi-book', to: '/admin/loan-products' },
      { label: 'Penalties', icon: 'pi pi-fw pi-book', to: '/admin/loan-products' },
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
