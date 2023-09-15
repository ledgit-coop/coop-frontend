<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Release Loan"
    :style="{ width: '40vw' }"
  >
    <div class="p-5">
      <Information :info="basic_information" />

      <div class="p-2"></div>
      <InlineMessage severity="warn">Please check the loan details before releasing.</InlineMessage>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Print Receipt"
        icon="pi pi-print"
        autofocus
      />
      <Button
        label="Release"
        icon="pi pi-send"
        @click="handleClickRelease"
        :loading="loadings.saving"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import type { Loan } from '@/types/ui/loans';
import type { InformationItem } from '@/types/ui';
import Information from './Information.vue';
import { formatNumber } from '@/helpers';
import LoanService from '@/service/LoanService';
import { MemberLoanStatus } from '@/constants/ui/members';

interface Props {
  visible: boolean;
  loan?: Loan;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const showModal = ref(false);
const confirm = useConfirm();

const basic_information = computed<InformationItem[]>(() => [
  { label: 'Applied Date', value: props?.loan?.applied_date ?? '' },
  { label: 'Released Date', value: props?.loan?.released_date ?? '' },
  { label: 'Interest Method', value: props?.loan?.interest_method ?? '' },
  { label: 'Interest Period', value: props?.loan?.loan_interest_period ?? '' },
  { label: 'Interest', value: (props?.loan?.loan_interest.toString() ?? '') + '%' },
  { label: 'Disbursement Channels', value: props?.loan?.disbursed_channel ?? '' },
  { label: 'Loan Amount', value: formatNumber(Number(props?.loan?.applied_amount ?? 0)) },
  { label: 'Approved Amount', value: formatNumber(Number(props?.loan?.principal_amount ?? 0)) },
  { label: 'Loan Purpose', value: props?.loan?.loan_purpose ?? '' },
]);

const { showApiError, showSuccess } = useAlert();

const loadings = ref({
  saving: false,
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
  }
);

const handleClickRelease = async () => {
  if (loadings.value.saving) return;
  try {
    confirm.require({
      message: 'Do you sure you want to proceed?',
      header: 'Release Loan',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        loadings.value.saving = true;

        try {
          await LoanService.updateStatus(props.loan?.id.toString() ?? '', MemberLoanStatus.RELEASED);
          showSuccess('Loan successfully added.');
          emit('updated');
        } catch (error) {
          showApiError(error as AxiosError);
        }

        loadings.value.saving = false;
        showModal.value = false;
      },
    });
  } catch (error) {
    showApiError(error as AxiosError);
  }
};
</script>
