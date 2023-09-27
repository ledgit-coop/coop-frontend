<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="product-name"
        required
        >Particular</Label
      >
      <InputText
        id="product-name"
        v-model="data.form.particular"
        type="text"
        validate="particular"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="particular"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="amount"
        >Amount</Label
      >
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        showButtons
        id="amount"
        placeholder="Amount"
        v-model="data.form.amount"
        type="text"
        validate="amount"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="amount"
      />
    </div>

    <div class="field col-12">
      <Label
        required
        for="transaction-date"
        >Date</Label
      >

      <Calendar
        pattern="dd-MM-yyyy"
        id="date-hired"
        v-model="data.form.transaction_date"
        mask="true"
        validate="transaction_date"
        v-validation="validation"
        showButtonBar
      />

      <FieldErrorMessage
        :validation="validation"
        field="transaction_date"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import { computed, onMounted, reactive, watch } from 'vue';
import type { TransactionForm } from '@/types/ui/transactions';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';

interface Props {
  modelValue?: TransactionForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: TransactionForm }>({
  form: {},
});

const form = computed(() => data.form);
const rules = computed(() => ({
  transaction_date: { required },
  amount: { required },
  particular: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
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
