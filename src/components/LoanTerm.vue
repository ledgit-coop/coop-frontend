<template>
  <div class="col-12">
    <PageContentHeader
      title="Terms & Interests"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-6">
    <label for="interest-method">Interest Method</label>
    <Dropdown
      id="interest-method"
      :options="interest_methods"
      optionLabel="label"
      option-value="value"
      placeholder="Select a Method"
      v-model="data.form.interest_method"
      class="w-full"
    />
  </div>

  <div class="field col-12">
    <label for="name">Interest Type</label>
    <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <RadioButton
          input-id="interest-type"
          name="interest_type"
          :value="LoanInterestType.PERCENTAGE_BASE"
          v-model="data.form.interest_type"
        />
        <label
          inputId="interest-type"
          class="ml-2"
          >Percentage Base %</label
        >
      </div>
      <div class="flex align-items-center">
        <RadioButton
          input-id="interest-type"
          name="interest_type"
          :value="LoanInterestType.FIX_AMOUNT_CYCLE"
          v-model="data.form.interest_type"
        />
        <label
          inputId="interest-type"
          class="ml-2"
          >Fixed Amount</label
        >
      </div>
    </div>
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Interest Period</label>
    <Dropdown
      :options="interest_periods"
      optionLabel="label"
      option-value="value"
      placeholder="Select a Period"
      v-model="data.form.loan_interest_period"
      class="w-full"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Interest</label>

    <span class="p-input-icon-right">
      <i class="pi pi-percentage" />
      <InputNumber
        placeholder="Loan Interest"
        v-model="data.form.loan_interest"
      />
    </span>
  </div>

  <div class="col-12">
    <PageContentHeader
      title="Duration"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Loan Duration Period</label>
    <Dropdown
      :options="duration_period"
      optionLabel="label"
      option-value="value"
      v-model="data.form.loan_duration_type"
      placeholder="Select a Duration Period"
      class="w-full"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="loan-duration-type">Duration</label>
    <InputNumber
      showButtons
      id="loan-duration-type"
      v-model="data.form.loan_duration"
      placeholder="Loan Duration"
      type="text"
    />
  </div>

  <div class="col-12">
    <PageContentHeader
      title="Repayment Method"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Repayment Cycle</label>
    <Dropdown
      :options="repaymentCycles"
      optionLabel="label"
      option-value="value"
      v-model="data.form.repayment_cycle"
      placeholder="Select a Repayment Cycle"
      class="w-full"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="number-repayments">Number of Repayments</label>
    <InputNumber
      showButtons
      id="number-repayments"
      v-model="data.form.number_of_repayments"
      placeholder="Number of Repayments"
      type="text"
    />
    <small>This will be auto computed based on loan duration.</small>
  </div>

  <div class="col-12">
    <PageContentHeader
      title="Repayment Mode"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12">
    <div class="flex flex-wrap gap-3">
      <div
        v-for="(channel, index) in loanRepaymentModes"
        :key="index"
        class="flex align-items-center"
      >
        <RadioButton
          v-model="data.form.repayment_mode"
          :input-id="'repayment-mode' + index"
          name="disbursed_channel"
          :value="channel.value"
        />
        <label
          :for="'repayment-model' + index"
          class="ml-2"
          >{{ channel.label }}</label
        >
      </div>
    </div>
  </div>

  <div class="col-12">
    <PageContentHeader
      title="Disbursement Channels"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12">
    <div class="flex flex-wrap gap-3">
      <div
        v-for="(channel, index) in loanDisbursementChannel"
        :key="index"
        class="flex align-items-center"
      >
        <RadioButton
          v-model="data.form.disbursed_channel"
          :input-id="'disbursement-channel' + index"
          name="disbursed_channel"
          :value="channel.value"
        />
        <label
          :for="'disbursement-channel' + index"
          class="ml-2"
          >{{ channel.label }}</label
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LoanDisbursementChannel,
  REPAYMENT_CYCLE_DROPDOWN,
  LoanInterestType,
  LoanRepaymentMethodChannel,
  LoanInterestPeriod,
  LoanInterestMethod,
  LoanDurationPeriod,
} from '@/constants/ui/loans';
import type { DropdownOption } from '@/types/ui';
import type { LoanTermForm } from '@/types/ui/loans';

import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import PageContentHeader from './PageContentHeader.vue';

interface Props {
  modelValue?: LoanTermForm;
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();
const data = reactive<{ form: LoanTermForm }>({
  form: {},
});
const loanDisbursementChannel = computed<DropdownOption[]>(() => [
  { label: 'Cash', value: LoanDisbursementChannel.CASH },
  { label: 'Bank Transfer', value: LoanDisbursementChannel.BANK_TRANSFER },
  { label: 'Cheque', value: LoanDisbursementChannel.CHEQUE },
  { label: 'E-Wallet Transfer', value: LoanDisbursementChannel.E_WALLET_TRANSFER },
]);

const loanRepaymentModes = computed<DropdownOption[]>(() => [
  { label: 'Collections', value: LoanRepaymentMethodChannel.COLLECTIONS },
  { label: 'Cash', value: LoanRepaymentMethodChannel.CASH },
  { label: 'Bank Transfer', value: LoanRepaymentMethodChannel.BANK_TRANSFER },
  { label: 'Cheque', value: LoanRepaymentMethodChannel.CHEQUE },
  { label: 'E-Wallet Transfer', value: LoanRepaymentMethodChannel.E_WALLET_TRANSFER },
]);

onMounted(() => {
  data.form = props.modelValue ?? {};
});

watch(
  () => data.form,
  () => {
    emit('update:modelValue', data.form);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value) => {
    data.form = value ?? {};
  },
  {
    deep: true,
  }
);

const interest_methods = ref<DropdownOption[]>([
  { label: 'Flat Rate', value: LoanInterestMethod.FLAT_RATE },
  { label: 'Reducing Balance (Installments)', value: LoanInterestMethod.REDUCING_BALANCE_EQUAL_INSTALLMENTS },
  { label: 'Reducing Balance (Principal)', value: LoanInterestMethod.REDUCING_BALANCE_EQUAL_PRINCIPAL },
]);

const duration_period = ref<DropdownOption[]>([
  { label: 'Days', value: LoanDurationPeriod.DAYS },
  { label: 'Weeks', value: LoanDurationPeriod.WEEKS },
  { label: 'Months', value: LoanDurationPeriod.MONTHS },
  { label: 'Year', value: LoanDurationPeriod.YEARS },
]);

const interest_periods = ref<DropdownOption[]>([
  { label: 'Per Day', value: LoanInterestPeriod.PER_DAY },
  { label: 'Per Week', value: LoanInterestPeriod.PER_WEEK },
  { label: 'Per Month', value: LoanInterestPeriod.PER_MONTH },
  { label: 'Per Year', value: LoanInterestPeriod.PER_YEAR },
  { label: 'Per Loan', value: LoanInterestPeriod.PER_LOAN },
]);

const repaymentCycles = ref<DropdownOption[]>(REPAYMENT_CYCLE_DROPDOWN);
</script>
