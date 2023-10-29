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
        date-format="yy-mm-dd"
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

    <div class="field col-12">
      <Label
        for="income-type"
        required
        >Income Type</Label
      >
      <Dropdown
        showClear
        id="income-type"
        :options="incomeType"
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Income Type"
        option-disabled="disabled"
        v-model="data.form.transaction_sub_type_id"
        v-validation="validation"
        :loading="loadings.sub_types"
        validate="transaction_sub_type_id"
        class="w-full"
      >
      </Dropdown>
      <FieldErrorMessage
        :validation="validation"
        field="transaction_sub_type_id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { TransactionForm } from '@/types/ui/transactions';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';

interface Props {
  modelValue?: TransactionForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: TransactionForm }>({
  form: {},
});
const { showApiError } = useAlert();
const incomeType = ref<DropdownOption[]>([]);
const loadings = ref({
  sub_types: false,
});
const form = computed(() => data.form);
const rules = computed(() => ({
  transaction_date: { required },
  amount: { required },
  particular: { required },
  transaction_sub_type_id: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
});

onMounted(() => {
  data.form = props.modelValue ?? {};
  loadIncomeSubTypes();
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

const loadIncomeSubTypes = () => {
  loadings.value.sub_types = true;
  UtilityService.getTransactionSubTypeIncomes()
    .then(({ data }) => {
      incomeType.value = data.map<DropdownOption>((t) => ({
        label: t.name?.toString() ?? '',
        value: t.id.toString() ?? '',
      }));
    })
    .catch((error) => {
      showApiError(error);
    })
    .finally(() => {
      loadings.value.sub_types = false;
    });
};
</script>
