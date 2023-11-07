<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Payment"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12 mb-5">
        <Label class="mb-3">Choose Amount To Pay</Label>
        <div class="flex flex-wrap gap-3 flex-column pl-3">
          <div class="flex align-items-center">
            <RadioButton
              v-model="amountPaidChoice"
              inputId="choice-amount"
              name="choice_amount"
              :value="overdueAmount"
            />
            <label
              for="choice-amount"
              class="ml-2 text-red-500"
              >{{ formatNumber(overdueAmount ?? 0) }} - Over-Due Amount</label
            >
          </div>

          <div class="flex align-items-center">
            <RadioButton
              v-model="amountPaidChoice"
              inputId="choice-amount"
              name="choice_amount"
              :value="dueAmount"
            />
            <label
              for="choice-amount"
              class="ml-2"
              >{{ formatNumber(dueAmount ?? 0) }} - Total Due Amount</label
            >
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="amountPaidChoice"
              inputId="ingredient2"
              name="choice_amount"
              :value="outstandingAmount"
            />
            <label
              for="ingredient2"
              class="ml-2"
              >{{ formatNumber(outstandingAmount ?? 0) }} - Total Outstanding Amount</label
            >
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="amountPaidChoice"
              inputId="ingredient3"
              name="choice_amount"
              :value="0"
            />
            <label
              for="ingredient3"
              class="ml-2"
              >Other Amount</label
            >
          </div>
        </div>
      </div>

      <div class="field col-12">
        <Label
          for="amount-paid"
          required
          >Amount Paid</Label
        >
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          id="amount-paid"
          v-model="model.amount_paid"
          validate="amount_paid"
          placeholder="Amount"
          v-validation="validation"
        />

        <FieldErrorMessage
          :validation="validation"
          field="amount_paid"
        />
      </div>

      <div class="col-12 pb-3">
        <Label
          for="payment-channel"
          required
          >Payment Channel</Label
        >
      </div>

      <div class="field col-12 flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="model.payment_channel"
            input-id="application-type"
            name="loan_type"
            value="payroll"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Payroll</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="model.payment_channel"
            input-id="application-type"
            name="loan_type"
            value="cash"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Cash</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="model.payment_channel"
            input-id="application-type"
            name="loan_type"
            value="cheque"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Cheque</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="model.payment_channel"
            input-id="application-type"
            name="loan_type"
            value="online-transfer"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Online Transfer</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="model.payment_channel"
            input-id="application-type"
            name="loan_type"
            value="e-wallet"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >E-Wallet</label
          >
        </div>
      </div>
      <div class="col-12">
        <FieldErrorMessage
          :validation="validation"
          field="payment_channel"
        />
      </div>
      <div class="p-1"></div>

      <div class="field col-12">
        <Label
          required
          for="payment_date"
          >Payment Date</Label
        >

        <Calendar
          date-format="yy-mm-dd"
          id="payment-date"
          v-model="model.payment_date"
          mask="true"
          validate="payment_date"
          placeholder="Date"
          v-validation="validation"
          showButtonBar
        />

        <FieldErrorMessage
          :validation="validation"
          field="payment_date"
        />
      </div>

      <div class="field col-12">
        <Label for="name">Reference # (if applicable)</Label>
        <InputText
          id="lastname2"
          type="text"
          v-model="model.payment_reference"
          placeholder="Reference Number"
        />
      </div>

      <div class="field col-12">
        <Label for="name">Remarks</Label>
        <InputText
          id="lastname2"
          v-model="model.payment_remarks"
          type="text"
          placeholder="Remarks"
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
        label="Save"
        icon="pi pi-save"
        autofocus
        @click="handleSave"
        :loading="loadings.save"
      />
      <Button
        label="Save & Print Receipt"
        icon="pi pi-save"
        disabled
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import Label from '@/components/Label.vue';
import type InputNumber from 'primevue/inputnumber';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useAlert from '@/composables/useAlert';
import LoanRepaymentService from '@/service/LoanRepaymentService';
import type { AxiosError } from 'axios';
import Calendar from 'primevue/calendar';
import moment from 'moment';
import { DATE_FORMAT_DB } from '@/constants';
import RadioButton from 'primevue/radiobutton';
import { formatNumber } from '@/helpers';

interface Props {
  visible: boolean;
  dueAmount?: number;
  overdueAmount?: number;
  outstandingAmount?: number;
  scheduleId?: string | number;
}

const { showApiError, showError, showSuccess } = useAlert();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const model = reactive<any>({
  amount_paid: undefined,
  payment_remarks: undefined,
  payment_reference: undefined,
  payment_channel: undefined,
  payment_date: undefined,
});
const amountPaidChoice = ref(0);
const showModal = ref(false);
const loadings = ref({
  save: false,
});
const form = computed(() => model);
const { validation } = useValidation({
  rules: {
    amount_paid: { required },
    payment_channel: { required },
    payment_date: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
  reset();
  if (value) {
    model.amount_paid = props.dueAmount;
    amountPaidChoice.value = props.dueAmount ?? 0;
  }
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

watch(
  () => amountPaidChoice.value,
  (value) => {
    model.amount_paid = Number(value ?? 0);
  }
);

const handleSave = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  loadings.value.save = true;
  try {
    await LoanRepaymentService.store(props.scheduleId?.toString(), {
      amount_paid: model.amount_paid ?? 0,
      payment_remarks: model.payment_remarks,
      payment_reference: model.payment_reference,
      payment_channel: model.payment_channel,
      payment_date: moment(model.payment_date).format(DATE_FORMAT_DB),
    });
    emit('updated');
    showModal.value = false;

    showSuccess('Payment successfully saved.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const reset = () => {
  validation.value?.$reset();
  model.amount_paid = undefined;
  model.payment_remarks = undefined;
  model.payment_reference = undefined;
  model.payment_channel = undefined;
  model.payment_date = undefined;
};
</script>
