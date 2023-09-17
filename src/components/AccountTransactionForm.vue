<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="accounts"
        required
        >Account</Label
      >
      <Dropdown
        showClear
        id="accounts"
        :options="accounts"
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Account"
        v-model="data.form.member_account_id"
        v-validation="validation"
        validate="member_account_id"
        class="w-full"
      >
      </Dropdown>
      <FieldErrorMessage
        :validation="validation"
        field="member_account_id"
      />
    </div>

    <div class="field col-12 mt-2">
      <h6>Transaction Type</h6>
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.transaction_type"
            input-id="application-type"
            name="transaction_type"
            value="withdrawal"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Withdrawal</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.transaction_type"
            input-id="application-type"
            name="transaction_type"
            value="deposit"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Deposit</label
          >
        </div>
      </div>

      <FieldErrorMessage
        :validation="validation"
        field="transaction_type"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="amount"
        >Amount</Label
      >

      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        id="amount"
        input-id="locale-user"
        v-validation="validation"
        validate="amount"
        v-model="data.form.amount"
      />
      <FieldErrorMessage
        :validation="validation"
        field="amount"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="particular"
        >Particular</Label
      >
      <InputText
        id="particular"
        type="text"
        validate="particular"
        v-validation="validation"
        v-model="data.form.particular"
      />
      <FieldErrorMessage
        :validation="validation"
        field="particular"
      />
    </div>

    <div class="field col-12 md:col-6">
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
import type { MemberAccountTransactionForm } from '@/types/ui/members';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from './FieldErrorMessage.vue';
import Label from './Label.vue';

interface Props {
  memberId?: string | number;
  modelValue?: MemberAccountTransactionForm;
}
const loadings = ref({
  fetch_accounts: false,
});

const rules = computed(() => ({
  member_account_id: { required },
  transaction_type: { required },
  amount: { required },
  particular: { required },
}));

const form = computed(() => data.form);

const accounts = ref<DropdownOption[]>([]);
const data = reactive<{ form: MemberAccountTransactionForm }>({
  form: {
    member_account_id: undefined,
    transaction_type: undefined,
    amount: undefined,
    particular: undefined,
  },
});

const { validation } = useValidation({
  rules,
  model: form,
});

const emit = defineEmits(['update:modelValue']);
const { showApiError } = useAlert();
const props = defineProps<Props>();

onMounted(() => {
  data.form = props.modelValue ?? {};
  fetchAccounts();
});

const fetchAccounts = async () => {
  loadings.value.fetch_accounts = true;
  try {
    const { data: acc } = await UtilityService.getmemberAcountDropdown(props.memberId?.toString() ?? '');
    accounts.value = acc;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch_accounts = false;
};

watch(
  () => data.form,
  () => {
    emit('update:modelValue', data.form);
  },
  { deep: true }
);
</script>
