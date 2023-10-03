<template>
  <Dialog
    v-model:visible="showModal"
    class="p-dialog-maximized"
    modal
    :style="{ width: '100vw' }"
    header="Emergency Loan - 1000023"
    @hide="emit('hide')"
  >
    <LoanStatus :status="loan?.status" />

    <TabView>
      <TabPanel header="Loan Information">
        <div class="flex">
          <div class="col-12 md:col-6 p-0 m-0">
            <PageContentHeader
              title="Loan Information"
              size="h6"
            >
            </PageContentHeader>

            <Information
              :loading="loadings.fetching"
              :info="basic_information_1"
            />
          </div>
          <div class="col-12 md:col-6 p-0">
            <PageContentHeader
              title="Loan Terms"
              size="h6"
            >
            </PageContentHeader>

            <Information
              :loading="loadings.fetching"
              :info="basic_information_3"
            />

            <Information
              :loading="loadings.fetching"
              :info="basic_information_2"
            />
          </div>
        </div>

        <div class="p-3"></div>

        <div class="flex flex-column gap-2">
          <span
            ><i
              class="pi pi-file-pdf pr-2"
              style="color: var(--gray-700)"
            ></i
            ><a
              href="#"
              @click="handleDownload('agreement')"
              >Download Agreement</a
            ></span
          >
          <span
            ><i
              class="pi pi-file-pdf pr-2"
              style="color: var(--gray-700)"
            ></i
            ><a href="#">Download Form</a></span
          >
        </div>
        <div class="p-3"></div>
      </TabPanel>

      <TabPanel header="Amortization">
        <PageContentHeader
          title="Loan Summary"
          size="h6"
        />

        <LoanSummary
          :model-value="loanSummary"
          :loading="loadings.fetch_schedule"
        />
        <div class="p-3"></div>

        <PageContentHeader
          title="Repayment Schedule"
          size="h6"
        />
        <DataTable
          ref="table"
          :value="schedules"
          table-style="min-width: 50rem"
          scrollable
          :loading="loadings.fetch_schedule"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-download"
                label="Export"
                class="p-button-outlined mb-2"
                size="small"
                @click="($refs as any).table.exportCSV()"
              />
            </div>
          </template>

          <Column
            field="id"
            header="#"
          >
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>

          <Column
            field="due_date"
            header="Due Date"
          ></Column>
          <Column
            field="principal_amount"
            header="Principal Amount"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.principal_amount) }}
            </template>
          </Column>

          <Column
            field="interest_amount"
            header="Interest Amount"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.interest_amount) }}
            </template>
          </Column>

          <Column
            field="penalty_amount"
            header="Penaly"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.penalty_amount) }}
            </template>
          </Column>

          <Column
            field="fee_amount"
            header="Fees"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.fee_amount) }}
            </template>
          </Column>

          <Column
            field="due_amount"
            header="Due Payment"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.due_amount) }}
            </template>
          </Column>

          <Column
            field="principal_balance"
            header="Loan Balance"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.principal_balance) }}
            </template>
          </Column>

          <Column
            field="amount_paid"
            header="Amount Paid"
          >
            <template #body="slotProps">
              {{ formatNumber(slotProps.data.amount_paid) }}
            </template>
          </Column>

          <ColumnGroup type="footer">
            <Row>
              <Column
                footer="Total Amount:"
                :colspan="2"
                footer-style="text-align:right"
              />
              <Column :footer="formatNumber(schedules?.reduce((n, p) => n + (p?.principal_amount ?? 0), 0) ?? 0)" />
              <Column :footer="formatNumber(schedules?.reduce((n, p) => n + (p?.interest_amount ?? 0), 0) ?? 0)" />

              <Column :footer="formatNumber(schedules?.reduce((n, p) => n + (p?.penalty_amount ?? 0), 0) ?? 0)" />

              <Column :footer="formatNumber(schedules?.reduce((n, p) => n + (p?.fee_amount ?? 0), 0) ?? 0)" />
              <Column :colspan="3" :footer="formatNumber(schedules?.reduce((n, p) => n + (p?.due_amount ?? 0), 0) ?? 0)" />
            </Row>
          </ColumnGroup>
        </DataTable>
        <div class="p-2"></div>
      </TabPanel>
      <TabPanel header="Logs">
        <PageContentHeader
          title="Comments"
          size="h6"
        />
        <Skeleton
          v-if="loadings.fetching"
          class="w-full"
        ></Skeleton>
        <Chatter
          v-else
          :module-id="loan?.id"
          :module="LogModules.LOAN"
          :parent-module-id="loan?.member_id"
          :parent-module="LogModules.MEMBER"
        />
      </TabPanel>
    </TabView>

    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@components/PageContentHeader.vue';
import type { InformationItem } from '@/types/ui';
import Information from '@components/Information.vue';
import type { MemberLoanSchedule } from '@/types/ui/members';
import LoanStatus from './LoanStatus.vue';
import Chatter from './Chatter.vue';
import LoanService from '@/service/LoanService';
import type { Loan } from '@/types/ui/loans';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { formatNumber } from '@/helpers';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import LoanSummary from './LoanSummary.vue';
import { type LoanSummaryTable } from '@/types/ui/loans';
import { LogModules } from '@/constants/ui/logs';

interface Props {
  visible: boolean;
  loanId?: string | number;
  disableMember?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'hide']);
const showModal = ref(false);
const loan = ref<Loan>();
const schedules = ref<MemberLoanSchedule[]>([]);
const basic_information_1 = computed<InformationItem[]>(() => [
  { label: 'Member', value: loan.value?.member?.full_name ?? '' },
  { label: 'Contact Number', value: loan.value?.contact_number ?? '' },
  { label: 'Age', value: loan.value?.age.toString() ?? '' },
  { label: 'Civil Status', value: loan.value?.civil_status ?? '' },
  { label: 'Present Address', value: loan.value?.present_address ?? '' },
  { label: 'Home Address', value: loan.value?.home_address ?? '' },
  { label: 'Valid ID', value: loan.value?.valid_id ?? '' },
  { label: 'Email', value: loan.value?.email ?? '' },
  { label: 'TIN Number', value: loan.value?.tin_number ?? '' },
  { label: 'Number of Children', value: loan.value?.number_of_children?.toString() ?? '' },
  { label: 'Employer Name', value: loan.value?.employer_name ?? '' },
  { label: 'Occupation', value: loan.value?.occupation ?? '' },
  { label: 'Work Address', value: loan.value?.work_address ?? '' },
  { label: 'Industry', value: loan.value?.work_industry ?? '' },
  { label: 'Salary Range', value: loan.value?.salary_range ?? '' },
  { label: 'Guarantor (1)', value: loan.value?.guarantor_first?.full_name ?? '' },
  { label: 'Guarantor (2)', value: loan.value?.guarantor_second?.full_name ?? '' },
]);

const basic_information_3 = computed<InformationItem[]>(() => [
  { label: 'Application Type', value: loan.value?.application_type ?? '' },
  { label: 'Type Of Loan Applied', value: loan.value?.loan_product?.name ?? '' },
  { label: 'Loan Amount', value: formatNumber(Number(loan.value?.applied_amount ?? 0)) },
  { label: 'Approved Amount', value: formatNumber(Number(loan.value?.principal_amount ?? 0)) },
  { label: 'Loan Purpose', value: loan.value?.loan_purpose ?? '' },
  { label: 'Account', value: loan.value?.member_account?.account?.name ?? '' },
]);
const basic_information_2 = computed<InformationItem[]>(() => [
  { label: 'Applied Date', value: loan.value?.applied_date ?? '' },
  { label: 'Released Date', value: loan.value?.released_date ?? '' },
  { label: 'Interest Method', value: loan.value?.interest_method ?? '' },
  { label: 'Interest Period', value: loan.value?.loan_interest_period ?? '' },
  { label: 'Interest', value: (loan.value?.loan_interest.toString() ?? '') + '%' },
  { label: 'Loan Duration Period', value: loan.value?.loan_duration_type ?? '' },
  { label: 'Loan Duration', value: loan.value?.loan_duration.toString() ?? '' },
  { label: 'Repayment Cycle', value: loan.value?.repayment_cycle ?? '' },
  { label: 'Number of Repayments', value: loan.value?.number_of_repayments.toString() ?? '' },
  { label: 'Repayment Mode', value: loan.value?.repayment_mode ?? '' },
  { label: 'Disbursement Channels', value: loan.value?.disbursed_channel ?? '' },
]);

const loanSummary = computed<LoanSummaryTable[]>(() => [
  {
    released_date: loan.value?.released_date ?? '',
    first_amortization_date: schedules.value ? schedules.value[0]?.due_date : '',
    maturity_date: schedules.value ? schedules.value[schedules.value.length - 1]?.due_date : '',
    principal: loan.value?.principal_amount ?? 0,
    interest: loan.value?.interest_amount ?? 0,
    payment: loan.value?.due_amount ?? 0,
    released_amount: loan.value?.released_amount ?? 0,
    fees: loan.value?.loan_fees?.map((r) => ({
      name: r.loan_fee_template?.name,
      amount: r.amount,
    })),
  },
]);

const { showApiError } = useAlert();
const loadings = ref({
  fetching: false,
  fetch_schedule: false,
});

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
    if (showModal.value) {
      loadLoan();
      loadSchedules();
    }
  }
);

const loadLoan = async () => {
  loadings.value.fetching = true;
  try {
    const { data } = await LoanService.show(Number(props.loanId ?? 0));
    loan.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};

const loadSchedules = async () => {
  loadings.value.fetch_schedule = true;
  try {
    const { data } = await LoanService.schedule(Number(props.loanId ?? 0));
    schedules.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch_schedule = false;
};

const handleDownload = async (type: string) => {
  console.log(await LoanService.downloadLink(loan.value?.id ?? 0, { document: type }));
};
</script>
