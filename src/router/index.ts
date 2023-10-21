import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import AuthService from '@/service/AuthService';
import {
  PUBLIC_ROUTES,
  ROUTE_LOAN_CALCULATOR,
  ROUTE_NAME_ACCOUNTS,
  ROUTE_NAME_EXPENSES,
  ROUTE_NAME_FORGOT_PASSWORD,
  ROUTE_NAME_LOANS,
  ROUTE_NAME_LOAN_FEES,
  ROUTE_NAME_LOAN_PRODUCTS,
  ROUTE_NAME_MEMBERS,
  ROUTE_NAME_MEMBERS_CREATE,
  ROUTE_NAME_MEMBERS_EDIT,
  ROUTE_NAME_MEMBERS_VIEW,
  ROUTE_NAME_REPAYMENTS,
  ROUTE_NAME_REPORTS,
  ROUTE_NAME_RESET_PASSWORD,
  ROUTE_NAME_TRANSACTION_TYPES,
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
      path: '/forgot-password',
      name: ROUTE_NAME_FORGOT_PASSWORD,
      component: () => import('@/views/pages/auth/ForgotPassword.vue'),
    },
    {
      path: '/reset-password',
      name: ROUTE_NAME_RESET_PASSWORD,
      component: () => import('@/views/pages/auth/PasswordReset.vue'),
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
              component: () => import('@/views/pages/members/MembersSave.vue'),
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
            {
              path: 'edit/:id',
              name: ROUTE_NAME_MEMBERS_EDIT,
              component: () => import('@/views/pages/members/MembersSave.vue'),
              meta: {
                title: 'Edit Member',
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
          ],
        },

        {
          path: '/reports',
          name: ROUTE_NAME_REPORTS,
          component: () => import('@/views/pages/reports/ReportsPage.vue'),
          meta: {
            title: 'Reports',
          },
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
          path: '/loan-calculator',
          name: ROUTE_LOAN_CALCULATOR,
          component: () => import('@/views/pages/loan-calculator/LoanCalculatorPage.vue'),
          meta: {
            title: 'Loan Calculator',
          },
        },

        {
          path: '/expenses',
          name: ROUTE_NAME_EXPENSES,
          component: () => import('@/views/pages/expenses/ExpensesPage.vue'),
          meta: {
            title: 'Expenses',
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
              path: 'accounts',
              redirect: 'accounts/list',
              children: [
                {
                  path: 'list',
                  name: ROUTE_NAME_ACCOUNTS,
                  component: () => import('@/views/pages/administration/accounts/AccountsPage.vue'),
                  meta: {
                    title: 'Accounts',
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
            {
              path: 'loan-fees',
              redirect: 'loan-fees/list',
              children: [
                {
                  path: 'list',
                  name: ROUTE_NAME_LOAN_FEES,
                  component: () => import('@/views/pages/administration/loan-fee-templates/LoanFeePage.vue'),
                  meta: {
                    title: 'Loan Fees',
                  },
                },
              ],
            },
            {
              path: 'transaction-types',
              redirect: 'transaction-types/list',
              children: [
                {
                  path: 'list',
                  name: ROUTE_NAME_TRANSACTION_TYPES,
                  component: () => import('@/views/pages/administration/transaction-types/TransactionTypePage.vue'),
                  meta: {
                    title: 'Transaction Types',
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
