<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Request Pre Termination"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12 md:col-6">
        <Label for="amount">Pre Termination Fee</Label>
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          id="amount"
          validate="amount"
          v-model="data.form.amount"
            v-validation="validation"
        />

        <FieldErrorMessage
            :validation="validation"
            field="amount"
          />
      </div>

      <div class="field col-12 md:col-6">
        <Label for="transaction-date">Requested Date</Label>

        <Calendar
          pattern="dd-MM-yyyy"
          id="date-hired"
          v-model="data.form.transaction_date"
          mask="true"
          validate="transaction_date"
          showButtonBar
          v-validation="validation"

        />

        <FieldErrorMessage
            :validation="validation"
            field="transaction_date"
          />
      </div>
    </div>

    <div class="p-2"></div>
    <InlineMessage severity="warn"
      >Make sure the borowwer already paid the termination fee before proceeding the request for termination.</InlineMessage
    >

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Request Pre Termination"
        icon="pi pi-send"
        severity="danger"
        @click="handleClickRequestPeTermination"
        :loading="loadings.saving"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { useConfirm } from 'primevue/useconfirm';
import type { Loan } from '@/types/ui/loans';
import LoanService from '@/service/LoanService';
import { MemberLoanStatus } from '@/constants/ui/members';
import Label from './Label.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import FieldErrorMessage from './FieldErrorMessage.vue';
import { dateFormat } from '@/helpers';
import { DATE_FORMAT_DB } from '@/constants';

interface Props {
  visible: boolean;
  loan?: Loan;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const showModal = ref(false);
const confirm = useConfirm();

const data = reactive<{
  form: {
    amount?: number;
    transaction_date?: string;
  };
}>({
  form: {},
});


const form = computed(() => data.form);
const { validation } = useValidation({
  rules: {
    amount: { required },
    transaction_date: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const { showApiError, showSuccess } = useAlert();

const loadings = ref({
  saving: false,
});

onMounted(() => {
  showModal.value = props.visible ?? false;

  if (props.loan) data.form.amount = props.loan.pre_termination_fee ?? 0;
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

watch(
  () => props.loan,
  (value) => {
    if (value) data.form.amount = value.pre_termination_fee ?? 0;
  }
);

const handleClickRequestPeTermination = async () => {
  await validation.value?.$validate();
  if(validation.value?.$invalid) return;
  if (loadings.value.saving) return;
  try {
    confirm.require({
      message: 'Do you sure you want to proceed?',
      header: 'Request Pre Termination',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        loadings.value.saving = true;

        try {
          await LoanService.updateStatus(props.loan?.id.toString() ?? '', MemberLoanStatus.REQUEST_PRE_TERMINATION,
          {
            pre_termination_fee: data.form.amount,
            pre_termination_date: dateFormat(data.form.transaction_date, DATE_FORMAT_DB),
          }
          );
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
