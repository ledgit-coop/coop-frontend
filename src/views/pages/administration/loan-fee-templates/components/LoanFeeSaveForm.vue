<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="product-name"
        required
        >Fee Name</Label
      >
      <InputText
        id="product-name"
        v-model="data.form.name"
        type="text"
        validate="name"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="name"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="fee-method"
        >Fee Method</Label
      >
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            input-id="fee-method"
            name="fee_type"
            :value="LoanFeeMethod.PERCENTAGE"
            v-model="data.form.fee_method"
          />
          <label
            inputId="fee-method"
            class="ml-2"
            >Percentage Base %</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            input-id="fee-method"
            name="fee_type"
            :value="LoanFeeMethod.FIX_AMOUNT"
            v-model="data.form.fee_method"
          />
          <label
            inputId="fee-method"
            class="ml-2"
            >Fixed Amount</label
          >
        </div>
      </div>
      <FieldErrorMessage
        :validation="validation"
        field="fee_method"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="fee"
        >Fee</Label
      >
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        showButtons
        id="fee"
        :placeholder="data.form.fee_method === LoanFeeMethod.FIX_AMOUNT ? 'Fee Amount' : 'Fee %'"
        v-model="data.form.fee"
        type="text"
        validate="fee"
        v-validation="validation"
      />

      <FieldErrorMessage
        :validation="validation"
        field="fee"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="fee-type"
        >Fee Type</Label
      >
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            input-id="fee-type"
            name="fee_type"
            :value="LoanFeeType.DEDUCT_PRINCIPAL"
            v-model="data.form.fee_type"
          />
          <label
            inputId="fee-type"
            class="ml-2"
            >Deductible to Principal</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            input-id="fee-type"
            name="fee_type"
            disabled
          />
          <label
            inputId="fee-type"
            class="ml-2"
            >Deductible to Amortization</label
          >
        </div>
      </div>
      <FieldErrorMessage
        :validation="validation"
        field="fee_type"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="fee-type"
        >Other Options</Label
      >

      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="creditType"
            inputId="share-capital"
            name="credit_type"
            value="share-capital"
          />
          <label
            for="share-capital"
            class="ml-2"
            >Credit To Share Capital</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="creditType"
            inputId="regular-savings"
            name="credit_type"
            value="regular-savings"
          />
          <label
            for="egular-savings"
            class="ml-2"
            >Credit To Regular Savings</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="creditType"
            inputId="mortuary"
            name="credit_type"
            value="mortuary"
          />
          <label
            for="mortuary"
            class="ml-2"
            >Credit To Mortuary</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="creditType"
            inputId="revenue"
            name="credit_type"
            value="revenue"
          />
          <label
            for="revenue"
            class="ml-2"
            >Credit To Revenue</label
          >
        </div>
      </div>

      <div class="m-3"></div>
      <div class="flex flex-column gap-3">
        <div class="flex align-items-center">
          <Checkbox
            inputId="show-to-report"
            name="show-to-report"
            binary
            v-model="data.form.show_to_report"
          />
          <label
            for="show-to-report"
            class="ml-2"
            >Show to Reports</label
          >
        </div>
      </div>
    </div>

    <div class="field col-12">
      <Label
        :required="data.form.credit_revenue"
        for="fee"
        help-text="Transaction type is not applicable to share capital and savings account"
        >Transaction Type</Label
      >
      <Dropdown
        showClear
        filter
        option-value="value"
        option-label="label"
        v-model="data.form.transaction_sub_type_id"
        :loading="loadings.fetch_sub_type"
        placeholder="Select Type of Transaction"
        :options="subTypes"
        validate="transaction_sub_type_id"
        v-validation="validation"
        :disabled="disableTransaction"
      >
      </Dropdown>
      <FieldErrorMessage
        :validation="validation"
        field="transaction_sub_type_id"
      />
    </div>

    <div class="field col-12">
      <Label required>Active</Label>
      <div class="flex flex-wrap gap-3">
        <InputSwitch v-model="data.form.enabled" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { LoanFeeForm } from '@/types/ui/loan-fee-templates';
import { LoanFeeMethod, LoanFeeType } from '@/constants/ui/loan-fee-templates';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import { required, requiredIf } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import { TransactionSubTypeTypes } from '@/constants/ui/transaction-types';

interface Props {
  modelValue?: LoanFeeForm;
}

const subTypes = ref<DropdownOption[]>([]);
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: LoanFeeForm }>({
  form: {},
});
const { showApiError } = useAlert();
const loadings = ref({
  fetch_sub_type: false,
});

const creditType = ref<any>(undefined);
const form = computed(() => data.form);

const rules = computed(() => ({
  name: { required },
  fee: { required },
  fee_type: { required },
  fee_method: { required },
  transaction_sub_type_id: {
    requiredIf: requiredIf((form.value.credit_revenue ?? false) && disableTransaction.value),
  },
}));

const disableTransaction = computed(
  () =>
    (form.value.credit_share_capital ?? false) ||
    (form.value.credit_regular_savings ?? false) ||
    (form.value.credit_mortuary ?? false)
);
const { validation } = useValidation({
  rules,
  model: form,
});

onMounted(() => {
  data.form = props.modelValue ?? {};
  setCreditType();
  loadIncomeSubTypes();
});

watch(
  () => creditType.value,
  (value) => {
    data.form.credit_revenue = false;
    data.form.credit_regular_savings = false;
    data.form.credit_share_capital = false;
    data.form.credit_mortuary = false;

    switch (value) {
      case 'share-capital':
        data.form.credit_share_capital = true;
        break;
      case 'revenue':
        data.form.credit_revenue = true;
        break;
      case 'regular-savings':
        data.form.credit_regular_savings = true;
        break;
      case 'mortuary':
        data.form.credit_mortuary = true;
        break;
    }
    handleDisableTransaction();
  }
);

watch(
  () => data.form,
  (value) => {
    emit('update:modelValue', value);
  },
  {
    deep: true,
  }
);

watch(
  () => props.modelValue,
  (value) => {
    data.form = value ?? {};
    setCreditType();
  },
  {
    deep: true,
  }
);

const setCreditType = () => {
  if (data.form?.credit_regular_savings) creditType.value = 'regular-savings';
  else if (data.form?.credit_share_capital) creditType.value = 'share-capital';
  else if (data.form?.credit_revenue) creditType.value = 'revenue';
  else if (data.form?.credit_mortuary) creditType.value = 'mortuary';
};

const loadIncomeSubTypes = () => {
  loadings.value.fetch_sub_type = true;
  UtilityService.getTransactionSubTypes([TransactionSubTypeTypes.LIABILITIES, TransactionSubTypeTypes.REVENUE])
    .then(({ data }) => {
      subTypes.value = data.map<DropdownOption>((t) => ({
        label: t.name?.toString() ?? '',
        value: t.id.toString() ?? '',
      }));
    })
    .catch((error) => {
      showApiError(error);
    })
    .finally(() => {
      loadings.value.fetch_sub_type = false;
    });
};

const handleDisableTransaction = () => {
  if (disableTransaction.value) {
    data.form.transaction_sub_type_id = undefined;
  }
};
</script>
