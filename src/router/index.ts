import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import AuthService from '@/service/AuthService';
import {
  PUBLIC_ROUTES,
  ROUTE_NAME_COLLECTIONS,
  ROUTE_NAME_LOANS,
  ROUTE_NAME_LOANS_CREATE,
  ROUTE_NAME_LOAN_PRODUCTS,
  ROUTE_NAME_MEMBERS,
  ROUTE_NAME_MEMBERS_CREATE,
  ROUTE_NAME_MEMBERS_VIEW,
  ROUTE_NAME_REPAYMENTS,
  ROUTE_NAME_USERS,
} from '@/constants/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/pages/Landing.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue'),
    },

    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('@/views/pages/auth/Access.vue'),
    },
    {
      path: '/auth/error',
      name: 'error',
      component: () => import('@/views/pages/auth/Error.vue'),
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            title: 'Dashboard',
          },
        },

        {
          path: '/members',
          redirect: 'members/list',
          children: [
            {
              path: 'list',
              name: ROUTE_NAME_MEMBERS,
              component: () => import('@/views/pages/members/MembersPage.vue'),
              meta: {
                title: 'Members',
              },
            },
            {
              path: 'create',
              name: ROUTE_NAME_MEMBERS_CREATE,
              component: () => import('@/views/pages/members/MembersCreate.vue'),
              meta: {
                title: 'Create Member',
              },
            },
            {
              path: 'view/:id',
              name: ROUTE_NAME_MEMBERS_VIEW,
              component: () => import('@/views/pages/members/MembersView.vue'),
              meta: {
                title: 'View Member',
              },
            },
          ],
        },

        {
          path: '/loans',
          redirect: 'loans/list',
          children: [
            {
              path: 'list',
              name: ROUTE_NAME_LOANS,
              component: () => import('@/views/pages/loans/LoansPage.vue'),
              meta: {
                title: 'Loans',
              },
            },
            {
              path: 'create',
              name: ROUTE_NAME_LOANS_CREATE,
              component: () => import('@/views/pages/loans/LoansCreate.vue'),
            },
          ],
        },

        {
          path: '/repayments',
          name: ROUTE_NAME_REPAYMENTS,
          component: () => import('@/views/pages/repayments/RepaymentsPage.vue'),
          meta: {
            title: 'Repayments',
          },
        },

        {
          path: '/collections',
          name: ROUTE_NAME_COLLECTIONS,
          component: () => import('@/views/pages/collections/CollectionsPage.vue'),
          meta: {
            title: 'Collections',
          },
        },

        {
          path: '/admin',
          children: [
            {
              path: 'users',
              redirect: 'users/list',
              children: [
                {
                  path: 'list',
                  name: ROUTE_NAME_USERS,
                  component: () => import('@/views/pages/administration/users/UsersPage.vue'),
                  meta: {
                    title: 'Users',
                  },
                },
              ],
            },
            {
              path: 'loan-products',
              redirect: 'loan-products/list',
              children: [
                {
                  path: 'list',
                  name: ROUTE_NAME_LOAN_PRODUCTS,
                  component: () => import('@/views/pages/administration/loan-products/LoanProductsPage.vue'),
                  meta: {
                    title: 'Loan Products',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: '/:catchAll(.*)*',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue'),
    },
  ],
});

router.beforeEach((to) => {
  document.title = 'DSPACC - ' + (to.meta?.title ?? 'Credit Portal');
});

router.beforeResolve(async (to) => {
  if (!AuthService.canAccess(to)) {
    // redirect the user to the login page
    return { name: 'login' };
  }
  if (AuthService.isAuthenticated() && PUBLIC_ROUTES.includes(<string>to.name)) {
    return { name: 'dashboard' };
  }
});

export default router;
