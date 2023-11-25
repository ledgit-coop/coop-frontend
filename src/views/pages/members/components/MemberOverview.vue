<template>
  <div class="flex col-12">
    <Button
      icon="pi pi-refresh"
      class="white-space-nowrap p-0 ml-auto"
      link
      label="Refresh"
      @click="loadOverview"
    />
  </div>
  <div class="grid">
    <div class="grid flex-column col-12 md:col-4 sm:col-6">
      <Panel
        v-if="member?.share_capital"
        class="col-12"
        header="Share Capital"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <h4 class="text-green-500">{{ formatCurrency(member?.share_capital.balance ?? 0, 'Php') }}</h4>
          <small class="text-500">Updated share capital balance</small>

          <div class="mt-2">
            <Button
              link
              label="View share capital"
              class="white-space-nowrap p-0"
              @click="emit('onClickViewShareCap')"
            />
          </div>
        </template>
      </Panel>

      <Panel
        v-if="member?.mortuary"
        class="col-12"
        header="Mortuary Contribution"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <h4 class="text-green-500">{{ formatCurrency(member?.mortuary.balance ?? 0, 'Php') }}</h4>
          <small class="text-500">Updated mortuary contribution</small>

          <div class="mt-2">
            <Button
              link
              label="View Mortuary"
              class="white-space-nowrap p-0"
              @click="emit('onClickViewMortuary')"
            />
          </div>
        </template>
      </Panel>

      <Panel
        class="col-12"
        header="Recent Activities"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <div
            class="overflow-auto"
            v-if="recentEvents && recentEvents.length > 0"
          >
            <Timeline :value="recentEvents">
              <template #opposite="slotProps">
                <small class="p-text-secondary">{{ slotProps.item.date }}</small>
              </template>
              <template #content="slotProps">
                {{ slotProps.item.status }}
              </template>
            </Timeline>
            <small class="text-500">List of 5 recent events and activities</small>
          </div>

          <p
            v-else
            class="text-500 text-center"
          >
            No recent activities
          </p>
        </template>
      </Panel>
    </div>

    <div class="grid flex-column col-12 md:col-4 sm:col-6">
      <Panel
        class="col-12"
        header="Active Loans"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <template v-if="overview?.active_loans && overview.active_loans.length > 0">
            <ul class="list-none p-0 m-0">
              <li
                v-for="(product, index) in overview?.active_loans"
                :key="index"
                class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
              >
                <div>
                  <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ product.name }}</span>
                  <div class="mt-1 text-600">
                    {{ product.interest?.toString() }}% / {{ product.period }} Interest Rate
                  </div>
                </div>
                <div class="mt-2 md:mt-0 flex align-items-center">
                  <h4 class="text-green-500 ml-3 font-medium">{{ formatCurrency(product.amount ?? 0, 'Php') }}</h4>
                </div>
              </li>
            </ul>
            <Button
              link
              label="View all loans"
              class="white-space-nowrap p-0"
              @click="emit('onClickViewLoans')"
            />
          </template>

          <p
            v-else
            class="text-500 text-center"
          >
            No active loans to show
          </p>
        </template>
      </Panel>

      <Panel
        class="col-12"
        header="Pending Loan Application"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <template v-if="overview?.pending_loans && overview.pending_loans.length > 0">
            <ul class="list-none p-0 m-0">
              <li
                v-for="(product, index) in overview?.pending_loans"
                :key="index"
                class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
              >
                <div>
                  <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ product.name }}</span>
                  <div class="mt-1 text-600">
                    {{ product.interest?.toString() }}% / {{ product.period }} interest rate
                  </div>

                  <div class="mt-2 flex align-items-center gap-2">
                    <LoanStatus :status="product.status" />
                    <small class="text-500">Applied on {{ dateFormat(product.applied_date, DATE_FORMAT_DATE) }}.</small>
                  </div>
                </div>
                <div class="mt-2 md:mt-0 flex align-items-center">
                  <h4 class="text-orange-500 ml-3 font-medium">{{ formatCurrency(product.amount ?? 0, 'Php') }}</h4>
                </div>
              </li>
            </ul>
            <small class="text-500">List of pending loans.</small>
          </template>

          <p
            v-else
            class="text-500 text-center"
          >
            No pending loans to show
          </p>
        </template>
      </Panel>
    </div>

    <div class="grid flex-column col-12 md:col-4 sm:col-6">
      <Panel
        class="col-12"
        header="Savings"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <template v-if="overview?.savings_accounts && overview.savings_accounts.length > 0">
            <ul class="list-none p-0 m-0">
              <li
                v-for="(savings, index) in overview?.savings_accounts"
                :key="index"
                class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
              >
                <div>
                  <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ savings.account?.name }}</span>
                  <div class="mt-1 text-600">Updated Balance</div>
                </div>
                <div class="mt-2 md:mt-0 flex align-items-center">
                  <h5 class="text-green-500 ml-3 font-medium">{{ formatCurrency(savings.balance ?? 0, 'Php') }}</h5>
                </div>
              </li>
            </ul>
            <Button
              link
              label="View savings"
              class="white-space-nowrap p-0"
              @click="emit('onClickViewAccounts')"
            />
          </template>

          <p
            v-else
            class="text-500 text-center"
          >
            No savings account to show
          </p>
        </template>
      </Panel>

      <Panel
        class="col-12"
        header="Guarantee Loans"
      >
        <template v-if="loadings.fetch || !member">
          <Skeleton class="mb-2 w-full"></Skeleton>
          <Skeleton class="mb-2 w-full"></Skeleton>
        </template>
        <template v-else>
          <template v-if="overview?.gaurantee_loans && overview.gaurantee_loans.length > 0">
            <ul class="list-none p-0 m-0">
              <li
                v-for="(gaurantee, index) in overview?.gaurantee_loans"
                :key="index"
                class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
              >
                <div>
                  <span class="text-900 font-medium mr-2 mb-1 md:mb-0">
                    <Button
                      class="p-0"
                      link
                      @click="handleMemberClick(gaurantee)"
                      :label="gaurantee.member?.full_name"
                    />
                  </span>
                  <div class="mt-1 text-600">{{ gaurantee.loan_product?.name }}</div>
                </div>
                <div class="mt-2 md:mt-0 flex align-items-center">
                  <h5 class="text-yellow-500 ml-3 font-medium">
                    {{ formatCurrency(gaurantee.principal_amount ?? 0, 'Php') }}
                  </h5>
                </div>
              </li>
            </ul>
          </template>

          <p
            v-else
            class="text-500 text-center"
          >
            No record to show
          </p>
        </template>
      </Panel>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useAlert from '@/composables/useAlert';
import { DATE_FORMAT_DATE, DATE_TIME_FORMAT, ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import { dateFormat, formatCurrency } from '@/helpers';
import MembersService from '@/service/MembersService';
import type { Member } from '@/types/ui/members';
import Timeline from 'primevue/timeline';
import { onMounted, ref, watch } from 'vue';
import type { GetMemberOverview } from '@/types/api/member';
import LoanStatus from '@/components/LoanStatus.vue';
import Button from 'primevue/button';
import router from '@/router';
import type { Loan } from '@/types/ui/loans';

interface Props {
  member?: Member;
}

const loadings = ref({
  fetch: false,
});
const props = defineProps<Props>();
const { showApiError } = useAlert();
const emit = defineEmits(['onClickViewLoans', 'onClickViewShareCap', 'onClickViewAccounts', 'onClickViewMortuary']);

const recentEvents = ref<any>([]);
const overview = ref<GetMemberOverview | undefined>();
onMounted(() => {
  if (props.member) loadOverview();
});

watch(
  () => props.member,
  (value) => {
    if (value) loadOverview();
  }
);

const handleMemberClick = (gaurantee: Loan) => {
  const routeData = router.resolve({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: gaurantee.member_id } });
  window.open(routeData.href);
};

const loadOverview = () => {
  if (!loadings.value.fetch) {
    loadings.value.fetch = true;
    MembersService.getOverview(props.member?.id ?? '')
      .then(({ data }) => {
        overview.value = data;
        if (data.recent_activities) {
          recentEvents.value = data.recent_activities.map((r) => ({
            status: r.content,
            date: dateFormat(r.updated_at, DATE_TIME_FORMAT),
          }));
        }
      })
      .catch((error) => showApiError(error))
      .finally(() => {
        loadings.value.fetch = false;
      });
  }
};
</script>
