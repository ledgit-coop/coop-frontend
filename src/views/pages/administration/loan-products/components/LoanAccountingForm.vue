<template>
  <Panel
    class="col-12"
    header="Accounting Settings"
    toggleable
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12 lg:col-4">
        <Label
          required
          for="disbursement-sub-type-transaction-id"
          >Disbursement Transaction</Label
        >
        <Dropdown
          option-value="value"
          option-label="label"
          v-model="data.form.disbursement_transaction_sub_type_id"
          :loading="loadings.fetch_sub_type"
          placeholder="Select Type of Transaction"
          :options="subTypes"
          validate="disbursement_transaction_sub_type_id"
          v-validation="validation"
        >
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="disbursement_transaction_sub_type_id"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <Label
          required
          for="penalties-sub-type-transaction-id"
          >Penalties Transaction</Label
        >

        <Dropdown
          option-value="value"
          option-label="label"
          v-model="data.form.penalty_transaction_sub_type_id"
          :loading="loadings.fetch_sub_type"
          placeholder="Select Type of Transaction"
          :options="subTypes"
          validate="penalty_transaction_sub_type_id"
          v-validation="validation"
        >
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="penalty_transaction_sub_type_id"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <Label
          required
          for="interest-sub-type-transaction-id"
          >Interest Transaction</Label
        >
        <Dropdown
          option-value="value"
          option-label="label"
          v-model="data.form.interest_transaction_sub_type_id"
          :loading="loadings.fetch_sub_type"
          placeholder="Select Type of Transaction"
          :options="subTypes"
          validate="interest_transaction_sub_type_id"
          v-validation="validation"
        >
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="interest_transaction_sub_type_id"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <Label
          required
          for="principal-sub-type-transaction-id"
          >Principal Payment Transaction</Label
        >
        <Dropdown
          option-value="value"
          option-label="label"
          v-model="data.form.principal_transaction_sub_type_id"
          :loading="loadings.fetch_sub_type"
          placeholder="Select Type of Transaction"
          :options="subTypes"
          validate="principal_transaction_sub_type_id"
          v-validation="validation"
        >
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="principal_transaction_sub_type_id"
        />
      </div>
    </div>
  </Panel>
</template>

<script lang="ts" setup>
import useAlert from '@/composables/useAlert';
import useValidation from '@/composables/useValidation';
import { TransactionSubTypeTypes } from '@/constants/ui/transaction-types';
import UtilityService from '@/service/UtilityService';
import type { DropdownOption } from '@/types/ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { required } from '@vuelidate/validators';
import type { LoanAccountingForm } from '@/types/ui/loan-products';
import Label from '@/components/Label.vue';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';

interface Props {
  modelValue?: LoanAccountingForm;
}

const loadings = ref({
  fetch_sub_type: false,
});

const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();
const data = reactive<{ form: LoanAccountingForm }>({
  form: {},
});

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

const subTypes = ref<DropdownOption[]>([]);
const { showApiError } = useAlert();

onMounted(() => {
  loadIncomeSubTypes();
});

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

const loadIncomeSubTypes = () => {
  loadings.value.fetch_sub_type = true;
  UtilityService.getTransactionSubTypes([TransactionSubTypeTypes.LIABILITIES, TransactionSubTypeTypes.REVENUE])
    .then(({ data }) => {
      subTypes.value = data.map<DropdownOption>((t) => ({
        label: t.name?.toString() ?? '',
        value: t.id,
      }));
    })
    .catch((error) => {
      showApiError(error);
    })
    .finally(() => {
      loadings.value.fetch_sub_type = false;
    });
};
</script>
