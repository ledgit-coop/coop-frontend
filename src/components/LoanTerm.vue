<template>
  <div class="col-12">
    <PageContentHeader
      title="Terms & Interests"
      size="h6"
    ></PageContentHeader>
  </div>

  <div class="field col-12 lg:col-4">
    <label for="interest-method">Interest Method</label>
    <Dropdown
      showClear
      id="interest-method"
      :options="interest_methods"
      optionLabel="label"
      option-disabled="disabled"
      option-value="value"
      placeholder="Select a Method"
      v-model="data.form.interest_method"
      class="w-full"
      validate="interest_method"
      v-validation="validation"
    />
    <FieldErrorMessage
      :validation="validation"
      field="interest_method"
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
          :disabled="true"
        />
        <label
          inputId="interest-type"
          class="ml-2"
          >Fixed Amount</label
        >
      </div>
    </div>

    <FieldErrorMessage
      :validation="validation"
      field="interest_type"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Interest Period</label>
    <Dropdown
      showClear
      :options="interest_periods"
      optionLabel="label"
      option-value="value"
      placeholder="Select a Period"
      option-disabled="disabled"
      v-model="data.form.loan_interest_period"
      class="w-full"
      validate="loan_interest_period"
      v-validation="validation"
    />
    <FieldErrorMessage
      :validation="validation"
      field="loan_interest_period"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="name">Interest</label>

    <span class="p-input-icon-right">
      <i class="pi pi-percentage" />
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        placeholder="Loan Interest"
        v-model="data.form.loan_interest"
        validate="loan_interest"
        v-validation="validation"
      />
    </span>
    <FieldErrorMessage
      :validation="validation"
      field="loan_interest"
    />
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
      showClear
      :options="duration_period"
      optionLabel="label"
      option-value="value"
      v-model="data.form.loan_duration_type"
      option-disabled="disabled"
      placeholder="Select a Duration Period"
      class="w-full"
      validate="loan_duration_type"
      v-validation="validation"
      @change="handleLoanDurationChange"
    />
    <FieldErrorMessage
      :validation="validation"
      field="loan_duration_type"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="loan-duration-type">Duration</label>
    <InputNumber
      :minFractionDigits="2"
      :maxFractionDigits="3"
      showButtons
      id="loan-duration-type"
      v-model="data.form.loan_duration"
      placeholder="Loan Duration"
      @blur="handleLoanDurationChange"
      type="text"
      validate="loan_duration"
      v-validation="validation"
    />
    <FieldErrorMessage
      :validation="validation"
      field="loan_duration"
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
      showClear
      :options="repaymentCycles"
      optionLabel="label"
      option-value="value"
      v-model="data.form.repayment_cycle"
      @change="handleLoanDurationChange"
      placeholder="Select a Repayment Cycle"
      class="w-full"
      validate="repayment_cycle"
      v-validation="validation"
    />
    <FieldErrorMessage
      :validation="validation"
      field="repayment_cycle"
    />
  </div>

  <div class="field col-12 lg:col-4">
    <label for="number-repayments">Number of Repayments</label>
    <InputNumber
      :minFractionDigits="2"
      :maxFractionDigits="3"
      showButtons
      id="number-repayments"
      v-model="data.form.number_of_repayments"
      placeholder="Number of Repayments"
      type="text"
      validate="number_of_repayments"
      v-validation="validation"
    />
    <FieldErrorMessage
      :validation="validation"
      field="number_of_repayments"
    />
  </div>

  <div
    v-if="
      [RepaymentCycle.BIWEEKLY.toString(), RepaymentCycle.MONTHLY.toString()].includes(data.form.repayment_cycle ?? '')
    "
    class="field col-12 lg:col-4"
  >
    <label for="number-repayments">Next Payroll Date <span class="font-italic">(Optional)</span></label>

    <Calendar
      pattern="dd-MM-yyyy"
      id="date-hired"
      v-model="data.form.next_payroll_date"
      mask="true"
      validate="next_payroll_date"
      v-validation="validation"
      showButtonBar
    />

    <FieldErrorMessage
      :validation="validation"
      field="next_payroll_date"
    />
  </div>

  <template v-if="!hideRepaymentMode">
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
      <FieldErrorMessage
        :validation="validation"
        field="repayment_mode"
      />
    </div>
  </template>

  <template v-if="!hideDisbursementChannel">
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
      <FieldErrorMessage
        :validation="validation"
        field="disbursed_channel"
      />
    </div>

    <div class="col-12">
      <PageContentHeader
        title="Penalties"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Penalty Grace Period (Days)</label>

      <InputNumber
        placeholder="Grace Period"
        v-model="data.form.penalty_grace_period"
        validate="penalty_grace_period"
      />
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Penalty</label>

      <span class="p-input-icon-right">
        <i
          v-if="data.form.penalty_method === LoanPenaltyMethod.PERCENTAGE"
          class="pi pi-percentage"
        />
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          placeholder="Loan Interest"
          v-model="data.form.penalty"
          validate="penalty"
        />
      </span>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Penalty Method</label>
      <Dropdown
        showClear
        optionLabel="label"
        option-value="value"
        placeholder="Select a Period"
        option-disabled="disabled"
        v-model="data.form.penalty_method"
        class="w-full"
        :options="penaltyMethods"
        validate="penalty_method"
      />
    </div>

    <div class="field col-12">
      <label for="name">Penalty Recurring</label>
      <Dropdown
        showClear
        optionLabel="label"
        option-value="value"
        placeholder="Select a Period"
        option-disabled="disabled"
        v-model="data.form.penalty_duration"
        class="w-full"
        :options="penaltyDurations"
        validate="penalty_duration"
      />
    </div>

    <div class="col-12">
      <PageContentHeader
        title="Pre Termination"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Pre Termination Penalty</label>

      <span class="p-input-icon-right">
        <i
          v-if="data.form.pre_termination_panalty_method === LoanPenaltyMethod.PERCENTAGE"
          class="pi pi-percentage"
        />
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          placeholder="Pre Termination Penalty"
          v-model="data.form.pre_termination_panalty"
          validate="pre_termination_panalty"
        />
      </span>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Pre Termination Method</label>
      <Dropdown
        showClear
        optionLabel="label"
        option-value="value"
        placeholder="Select a Method"
        option-disabled="disabled"
        v-model="data.form.pre_termination_panalty_method"
        class="w-full"
        :options="penaltyMethods"
        validate="pre_termination_panalty_method"
      />
    </div>
  </template>
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
  RepaymentCycle,
  LoanPenaltyMethod,
  LoanPenaltyFrequency,
} from '@/constants/ui/loans';
import type { DropdownOption } from '@/types/ui';
import type { LoanTermForm } from '@/types/ui/loans';
import { required } from '@vuelidate/validators';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import PageContentHeader from './PageContentHeader.vue';
import FieldErrorMessage from './FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { computeRepaymentCycleCount } from '@/helpers';

interface Props {
  modelValue?: LoanTermForm;
  hideRepaymentMode?: boolean;
  hideDisbursementChannel?: boolean;
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

const form = computed(() => data.form);
const { validation } = useValidation({
  rules: {
    repayment_cycle: { required },
    number_of_repayments: { required },
    repayment_mode: { required },
    disbursed_channel: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const interest_methods = ref<DropdownOption[]>([
  { label: 'Flat Rate', value: LoanInterestMethod.FLAT_RATE },
  {
    label: 'Reducing Balance (Installments)',
    value: LoanInterestMethod.REDUCING_BALANCE_EQUAL_INSTALLMENTS,
    disabled: true,
  },
  { label: 'Reducing Balance (Principal)', value: LoanInterestMethod.REDUCING_BALANCE_EQUAL_PRINCIPAL, disabled: true },
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

const penaltyMethods = ref<DropdownOption[]>([
  { label: 'Fix', value: LoanPenaltyMethod.FIX_AMOUNT },
  { label: 'Percent', value: LoanPenaltyMethod.PERCENTAGE },
]);

const penaltyDurations = ref<DropdownOption[]>([
  { label: 'Every Day', value: LoanPenaltyFrequency.EVERY_DAY },
  { label: 'Every Week', value: LoanPenaltyFrequency.EVERY_WEEK },
  { label: 'Every Month', value: LoanPenaltyFrequency.EVERY_MONTH },
  { label: 'Every Year', value: LoanPenaltyFrequency.EVERY_YEAR },
  { label: 'Only Amortization (One Time)', value: LoanPenaltyFrequency.EVERY_AMORTIZATION },
]);

const repaymentCycles = ref<DropdownOption[]>(REPAYMENT_CYCLE_DROPDOWN);

const handleLoanDurationChange = () => {
  const numberOfPayments = computeRepaymentCycleCount(
    data.form.loan_duration ?? 0,
    data.form.loan_duration_type as LoanDurationPeriod,
    data.form.repayment_cycle as RepaymentCycle
  );
  data.form.number_of_repayments = numberOfPayments ?? 0;
};
</script>
