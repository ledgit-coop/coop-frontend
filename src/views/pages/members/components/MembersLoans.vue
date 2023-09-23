<template>
  <template v-if="loansWidget.length > 0">
    <MembersLoanWidget
      v-if="loansWidget.length > 0"
      :loans="loansWidget"
      @sort="onSort"
      :total-records="totalRecords"
      @page="onPageChange"
    />
  </template>

  <PageContentHeader
    class="mt-5"
    title="History"
    size="h5"
  >
  </PageContentHeader>

  <LoansTable
    :hide-columns="['member']"
    :model-value="loans"
    :rows="rows"
    :loading="loadings.table"
  >
    <template #header>
      <div class="flex justify-content-between flex-column sm:flex-row">
        <div class="grid gap-1 m-0 align-items-start ml-auto">
          <Dropdown
            showClear
            filter
            option-value="value"
            option-label="label"
            v-model="filters.loan_product_id"
            @change="loadTable(params)"
            :loading="loadings.loan_products"
            placeholder="Select Loan"
            :options="loanProducts"
          >
          </Dropdown>

          <Dropdown
            showClear
            filter
            :options="years"
            v-model="filters.year"
            option-value="value"
            option-label="label"
            placeholder="Select a Year"
            @change="loadTable(params)"
          >
          </Dropdown>
        </div>
      </div>
    </template>
    <template #action="slotProps">
      <LoanActions
        :loan="slotProps.data"
        @updated="loadTable(params)"
      />
    </template>
  </LoansTable>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import MembersLoanWidget from './MembersLoanWidget.vue';
import type { MemberLoanWidgetItem, Member } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanService from '@/service/LoanService';
import useTableParameters from '@/composables/useTableParameters';
import type { LoanListPayload } from '@/types/api/loans';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import type { Loan } from '@/types/ui/loans';
import LoansTable from '@/components/LoansTable.vue';
import LoanActions from '@/components/LoanActions.vue';
import UtilityService from '@/service/UtilityService';
import type { DropdownOption } from '@/types/ui';
import { generateYearListDropdown } from '@/helpers';

interface Props {
  member?: Member;
}

const filters = ref({
  loan_product_id: undefined,
  year: undefined,
});

const loadings = ref({
  table: false,
  loan_products: false,
});

const props = defineProps<Props>();
const { showApiError } = useAlert();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);
const loans = ref<Loan[]>();
const loansWidget = ref<MemberLoanWidgetItem[]>([]);
const loanProducts = ref<DropdownOption[]>([]);
const years = computed(() => generateYearListDropdown());

onMounted(() => {
  loadLoanProducts();
});

watch(
  () => props.member?.id,
  (value) => {
    if (value) {
      loadTable(params.value);
      loadWidgetData();
    }
  }
);

watch(params, (params) => {
  loadTable(params);
});

onMounted(() => {
  loadTable(params.value);
  loadWidgetData();
});
const loadTable = async (params: LoanListPayload) => {
  loadings.value.table = true;
  try {
    const { data } = await LoanService.list({
      ...params,
      member_id: props.member?.id,
    });

    loans.value = data.data;

    paginate(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.table = false;
};

const loadWidgetData = async () => {
  loadings.value.table = true;
  try {
    const { data } = await LoanService.activeLoans(props.member?.id);
    console.log(data);
    loansWidget.value = data.map((l) => ({
      type: l.loan_product?.name ?? '',
      balance: l.outstanding ?? 0,
      terms: l.loan_duration ?? 0,
      paid: l.loan_schedules?.filter((r) => r.paid).length ?? 0,
      currency: 'Php',
    }));
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.table = false;
};
const loadLoanProducts = async () => {
  loadings.value.loan_products = true;
  try {
    const { data } = await UtilityService.getLoanProducts();
    loanProducts.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};
</script>
