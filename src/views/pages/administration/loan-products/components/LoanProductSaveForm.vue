<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="product-name"
        required
        >Product Name</Label
      >
      <InputText
        id="product-name"
        v-model="data.form.name"
        type="text"
      />
    </div>

    <div class="col-12">
      <PageContentHeader
        title="Loanable Amounts"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="min-principal-amount">Minimum</label>
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        showButtons
        id="min-principal-amount"
        placeholder="Min"
        v-model="data.form.min_principal_amount"
        type="text"
      />
    </div>

    <div class="field col-12 lg:col-4">
      <label for="default-principal-amount">Default</label>
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        showButtons
        id="default-principal-amount"
        placeholder="Default"
        v-model="data.form.default_principal_amount"
      />
    </div>

    <div class="field col-12 lg:col-4">
      <label for="max-principal-amount">Maximum</label>
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        showButtons
        id="max-principal-amount"
        placeholder="Max"
        v-model="data.form.max_principal_amount"
      />
    </div>

    <LoanTerm v-model="data.form.loan_term" />
    <div class="p-2"></div>
    <LoanFeeForm v-model="data.form.loan_product_fees" />
    <div class="p-2"></div>
    <LoanAccountingForm v-model="data.form.loan_accounting" />
  </div>
</template>
<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanTerm from '@/components/LoanTerm.vue';
import Label from '@/components/Label.vue';
import LoanFeeForm from '@/components/LoanFeeForm.vue';
import { onMounted, reactive, watch } from 'vue';
import type { LoanProductForm } from '@/types/ui/loan-products';
import LoanAccountingForm from './LoanAccountingForm.vue';

interface Props {
  modelValue?: LoanProductForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: LoanProductForm }>({
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
  }
);
</script>
