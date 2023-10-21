<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from '@/layout/AppMenuItem.vue';
import {
  ROUTE_LOAN_CALCULATOR,
  ROUTE_NAME_ACCOUNTS,
  ROUTE_NAME_EXPENSES,
  ROUTE_NAME_LOANS,
  ROUTE_NAME_LOAN_FEES,
  ROUTE_NAME_LOAN_PRODUCTS,
  ROUTE_NAME_MEMBERS,
  ROUTE_NAME_REPAYMENTS,
  ROUTE_NAME_REPORTS,
  ROUTE_NAME_TRANSACTION_TYPES,
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
      { label: 'Loan Calculator', icon: 'pi pi-fw pi-history', to: { name: ROUTE_LOAN_CALCULATOR } },
      {
        label: 'Expenses',
        icon: 'pi pi-fw pi-history',
        to: { name: ROUTE_NAME_EXPENSES },
      },
      {
        label: 'Reports',
        icon: 'pi pi-fw pi-chart-bar',
        to: { name: ROUTE_NAME_REPORTS },
      },
    ],
  },

  {
    label: 'Administration',
    items: [
      { label: 'Users', icon: 'pi pi-fw pi-users', to: { name: ROUTE_NAME_USERS } },
      { label: 'Loan Products', icon: 'pi pi-fw pi-book', to: { name: ROUTE_NAME_LOAN_PRODUCTS } },
      {
        label: 'Loan Fees',
        icon: 'pi pi-fw pi-book',
        to: { name: ROUTE_NAME_LOAN_FEES },
      },

      {
        label: 'Account Types',
        icon: 'pi pi-fw pi-book',
        to: { name: ROUTE_NAME_ACCOUNTS },
      },
      {
        label: 'Transaction Types',
        icon: 'pi pi-fw pi-book',
        to: { name: ROUTE_NAME_TRANSACTION_TYPES },
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
  </ul>
</template>

<style lang="scss" scoped></style>
