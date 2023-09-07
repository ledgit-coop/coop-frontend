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
      <Button
        icon="pi pi-download"
        label="Download Agreement"
      ></Button>

      <Button
        icon="pi pi-download"
        label="Download Application"
      ></Button>
    </PageContentHeader>

    <div class="p-2"></div>
    <Information :info="basic_information" />
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

interface Props {
  visible: boolean;
  loanId?: string | number;
  disableMember?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const showModal = ref(false);
const schedules = ref<MemberLoanSchedule[]>([]);
const basic_information = computed<InformationItem[]>(() => [
  { label: 'Loan Number', value: '1000023' },
  { label: 'Term', value: '12 mos.' },
  { label: 'Due Every', value: '5th of the month' },
  { label: 'Interest Rate', value: '1.5%' },
  { label: 'Application Type', value: 'New' },
  { label: 'Purpose', value: 'Home Improvement' },
  { label: 'Payment Mode', value: 'Cash' },
  { label: 'Payment Method', value: 'Over the counter' },
  { label: 'Applied Amount', value: '10,000.00' },
  { label: 'Approved Amount', value: '20,000.00' },
  { label: 'Disbursed Date', value: 'Sept 2, 2023' },
  { label: 'Disbursement Channel', value: 'Over the counter' },
  { label: 'Co-maker 1', value: 'Kevin Loquencio' },
  { label: 'Co-maker 2', value: 'Mark Lien' },
]);

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
    if (showModal.value) loadInfo();
  }
);

const loadInfo = async () => {
  schedules.value = await MembersService.getMemberLoanSchedule('1');
};
</script>
