<template>
  <PageContentHeader
    class="mt-5"
    title="Active Loans"
    size="h5"
  >
  </PageContentHeader>

  <MembersLoanWidget
    v-if="loans.length > 1"
    :loans="loans"
    @sort="onSort"
    :total-records="totalRecords"
    @page="onPageChange"
  />

  <PageContentHeader
    class="mt-5"
    title="History"
    size="h5"
  >
    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select Loan"
    >
    </Dropdown>

    <Dropdown
      filter
      option-value="value"
      option-label="label"
      placeholder="Select a Year"
    >
    </Dropdown>
  </PageContentHeader>

  <LoansTable
    :hide-columns="['member']"
    :model-value="history"
    :rows="rows"
    :loading="loadings.table"
  >
    <template #action="slotProps">
      <LoanActions
        :loan="slotProps.data"
        @updated="loadTable(params)"
      />
    </template>
  </LoansTable>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
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

interface Props {
  member?: Member;
}

const filters = ref({
  status: '',
  keyword: '',
});

const loadings = ref({
  table: false,
});
const props = defineProps<Props>();
const { showApiError } = useAlert();
const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);
const history = ref<Loan[]>();
const loans = ref<MemberLoanWidgetItem[]>([
  {
    type: 'Salary Loan',

    balance: 202040.2,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
  {
    type: 'Emergency Loan',

    balance: 200000,
    terms: 12,
    paid: 2,
    currency: 'Php',
  },
]);

watch(
  () => props.member?.id,
  (value) => {
    if (value) {
      loadTable(params.value);
    }
  }
);

watch(params, (params) => {
  loadTable(params);
});

const loadTable = async (params: LoanListPayload) => {
  loadings.value.table = true;
  try {
    const { data } = await LoanService.list({
      ...params,
      member_id: props.member?.id,
    });
    history.value = data.data;

    paginate(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.table = false;
};
</script>
