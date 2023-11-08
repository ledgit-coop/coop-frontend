<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Approve Loan"
    :style="{ width: '30vw' }"
  >
    <Information :info="basic_information" />
    <h4>Applied Amount: {{ formatNumber(loan?.applied_amount ?? 0, '--') }}</h4>
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label for="approved-amount">Approved Amount</Label>
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          show-buttons
          mode="currency"
          currency="PHP"
          id="approved-amount"
          validate="approved_amount"
          v-model="approvedAmount"
          v-validation="validation"
        />

        <FieldErrorMessage
          :validation="validation"
          field="approved_amount"
        />
      </div>
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />

      <Button
        label="Approve"
        icon="pi pi-thumbs-up-fill"
        @click="handleClickApprove"
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
import { dateFormat, formatNumber } from '@/helpers';
import LoanService from '@/service/LoanService';
import { MemberLoanStatus } from '@/constants/ui/members';
import Label from './Label.vue';
import { DATE_FORMAT_DATE } from '@/constants';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import FieldErrorMessage from './FieldErrorMessage.vue';

interface Props {
  visible: boolean;
  loan?: Loan;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const showModal = ref(false);
const confirm = useConfirm();
const approvedAmount = ref();
const basic_information = computed<InformationItem[]>(() => [
  { label: 'Applied Date', value: dateFormat(props?.loan?.applied_date, DATE_FORMAT_DATE) ?? '' },
  { label: 'Expected Releasing Date', value: dateFormat(props?.loan?.released_date, DATE_FORMAT_DATE) ?? '' },
  { label: 'Interest Method', value: props?.loan?.interest_method ?? '' },
  { label: 'Interest Period', value: props?.loan?.loan_interest_period ?? '' },
  { label: 'Interest', value: (props?.loan?.loan_interest.toString() ?? '') + '%' },
  { label: 'Disbursement Channels', value: props?.loan?.disbursed_channel ?? '' },
  { label: 'Loan Purpose', value: props?.loan?.loan_purpose ?? '' },
]);

const form = computed(() => ({
  approved_amount: approvedAmount.value,
}));

const { validation } = useValidation({
  rules: {
    approved_amount: { required },
  },
  model: form,
});

const { showApiError, showSuccess, showError } = useAlert();

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

const handleClickApprove = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  if (loadings.value.saving) return;
  try {
    confirm.require({
      message: 'Do you sure you want to proceed?',
      header: 'Approve Loan',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        loadings.value.saving = true;

        try {
          await LoanService.updateStatus(props.loan?.id.toString() ?? '', MemberLoanStatus.APPROVED, {
            approved_amount: approvedAmount.value,
          });
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
