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
    </div>

    <div class="field col-12">
      <Label
        required
        for="fee-type"
        >Other Options</Label
      >
      <div class="flex flex-column gap-3">
        <div class="flex align-items-center">
          <Checkbox
            inputId="credit-share-capital"
            name="credit_share_capital"
            binary
            v-model="data.form.credit_share_capital"
          />
          <label
            for="credit-share-capital"
            class="ml-2"
            >Credit To Share Capital</label
          >
        </div>
        <div class="flex align-items-center">
          <Checkbox
            inputId="credit-regular-savings"
            name="credit_regular_savings"
            binary
            v-model="data.form.credit_regular_savings"
          />
          <label
            for="credit-regular-savings"
            class="ml-2"
            >Credit To Regular Savings</label
          >
        </div>
        <div class="flex align-items-center">
          <Checkbox
            inputId="credit-revenue"
            name="credit_revenue"
            binary
            v-model="data.form.credit_revenue"
          />
          <label
            for="credit-revenue"
            class="ml-2"
            >Credit To Revenue</label
          >
        </div>
      </div>
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
import { onMounted, reactive, watch } from 'vue';
import type { LoanFeeForm } from '@/types/ui/loan-fee-templates';
import { LoanFeeMethod, LoanFeeType } from '@/constants/ui/loan-fee-templates';
import InputSwitch from 'primevue/inputswitch';

interface Props {
  modelValue?: LoanFeeForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: LoanFeeForm }>({
  form: {},
});

onMounted(() => {
  data.form = props.modelValue ?? {};
});

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
  },
  {
    deep: true,
  }
);
</script>
