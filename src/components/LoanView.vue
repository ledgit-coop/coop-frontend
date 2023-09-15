<template>
  <Dialog
    v-model:visible="showModal"
    modal
    maximizable
    header="Emergency Loan - 1000023"
  >
    <PageContentHeader
      title="Loan Information"
      size="h6"
    >
      <LoanStatus :status="loan?.status" />

      <Button
        icon="pi pi-download"
        label="Download Agreement"
        v-tooltip="'Edit'"
        severity="warning"
        text
        raised
        rounded
      ></Button>

      <Button
        icon="pi pi-download"
        label="Download Application"
      ></Button>

      <Button
        icon="pi pi-upload"
        severity="secondary"
        label="Upload Files"
      ></Button>
    </PageContentHeader>

    <div class="p-2"></div>

    <div class="flex">
      <div class="col-12 md:col-6 p-0">
        <Information :info="basic_information_1" />
      </div>
      <div class="col-12 md:col-6 p-0">
        <Information :info="basic_information_2" />
      </div>
    </div>

    <div class="p-3"></div>

    <div class="flex flex-column gap-2">
      <span
        ><i
          class="pi pi-file-pdf pr-2"
          style="color: var(--gray-700)"
        ></i
        ><a href="http://">Download Agreement</a></span
      >
      <span
        ><i
          class="pi pi-file-pdf pr-2"
          style="color: var(--gray-700)"
        ></i
        ><a href="http://">Download Form</a></span
      >
    </div>
    <div class="p-3"></div>

    <PageContentHeader
      title="Payment Schedules"
      size="h6"
    >
    </PageContentHeader>

    <DataTable
      :value="schedules"
      table-style="min-width: 50rem"
      scrollable
    >
      <Column
        field="due_date"
        header="Due Date"
      ></Column>
      <Column
        field="amount_due"
        header="Amount Due"
      ></Column>

      <Column
        field="late_fees"
        header="Late Fees"
      ></Column>
      <Column
        field="amount_paid"
        header="Amount Paid"
      ></Column>

      <ColumnGroup type="footer">
        <Row>
          <Column
            footer="Total Amount:"
            :colspan="3"
            footer-style="text-align:right"
          />
          <Column footer="1,100.00" />
        </Row>
      </ColumnGroup>
    </DataTable>
    <div class="p-2"></div>
    <PageContentHeader
      title="Comments"
      size="h6"
    >
    </PageContentHeader>
    <Chatter />
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
import MembersService from '@/service/MembersService';
import type { MemberLoanSchedule } from '@/types/ui/members';
import LoanStatus from './LoanStatus.vue';
import Chatter from './Chatter.vue';
import LoanService from '@/service/LoanService';
import type { Loan } from '@/types/ui/loans';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { formatNumber } from '@/helpers';

interface Props {
  visible: boolean;
  loanId?: string | number;
  disableMember?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
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
  { label: 'Number of Children', value: loan.value?.number_of_children.toString() ?? '' },
  { label: 'Employer Name', value: loan.value?.employer_name ?? '' },
  { label: 'Occupation', value: loan.value?.occupation ?? '' },
  { label: 'Work Address', value: loan.value?.work_address ?? '' },
  { label: 'Industry', value: loan.value?.work_industry ?? '' },
  { label: 'Salary Range', value: loan.value?.salary_range ?? '' },
  { label: 'Application Type', value: loan.value?.application_type ?? '' },
  { label: 'Type Of Loan Applied', value: loan.value?.loan_product?.name ?? '' },
  { label: 'Loan Amount', value: formatNumber(Number(loan.value?.applied_amount ?? 0)) },
  { label: 'Approved Amount', value: formatNumber(Number(loan.value?.principal_amount ?? 0)) },
  { label: 'Loan Purpose', value: loan.value?.loan_purpose ?? '' },
]);

const basic_information_2 = computed<InformationItem[]>(() => [
  { label: 'Account', value: loan.value?.member_account?.account?.name ?? '' },
  { label: 'Guarantor (1)', value: loan.value?.guarantor_first?.full_name ?? '' },
  { label: 'Guarantor (2)', value: loan.value?.guarantor_second?.full_name ?? '' },
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
const { showApiError } = useAlert();
const loadings = ref({
  fetching: false,
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
      loadInfo();
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

const loadInfo = async () => {
  schedules.value = await MembersService.getMemberLoanSchedule('1');
};
</script>
