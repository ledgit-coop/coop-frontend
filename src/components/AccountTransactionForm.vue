<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="accounts"
        required
        >Type of Transaction</Label
      >
      <Dropdown
        showClear
        id="accounts"
        :options="typeOfTransactions"
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Account"
        option-disabled="disabled"
        v-model="data.form.transaction_type"
        v-validation="validation"
        validate="transaction_type"
        class="w-full"
      >
      </Dropdown>
      <FieldErrorMessage
        :validation="validation"
        field="transaction_type"
      />
    </div>

    <div
      v-if="isSavingsTransaction"
      class="field col-12"
    >
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

    <div class="field col-12">
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

    <div
      v-if="isSavingsTransaction"
      class="field col-12"
    >
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
import type { MemberAccountTransactionForm } from '@/types/ui/members';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { required, requiredIf } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from './FieldErrorMessage.vue';
import Label from './Label.vue';
import { ActionTransactionType } from '@/constants/ui/transactions';
import { AccountType } from '@/constants/ui/accounts';

interface Props {
  memberId?: string | number;
  modelValue?: MemberAccountTransactionForm;
}
const loadings = ref({
  fetch_accounts: false,
});

const form = computed(() => data.form);
const typeOfTransactions = computed<DropdownOption[]>(() => [
  { label: 'Deposit Share Capital', value: ActionTransactionType.DepositShareCapital },
  { label: 'Withdraw Share Capital', value: ActionTransactionType.WithdrawShareCapital },

  { label: 'Deposit Savings', value: ActionTransactionType.DepositSavings },
  { label: 'Withdraw Savings', value: ActionTransactionType.WithdrawSavings },

  { label: 'Pay Amortization', value: ActionTransactionType.PayAmortization, disabled: true },
  { label: 'Pay Membership', value: ActionTransactionType.PayMembership, disabled: true },
  { label: 'Pay Loan Pre-Termination Fee', value: ActionTransactionType.PayLoanPreTerminationFee, disabled: true },
]);
const accounts = ref<DropdownOption[]>([]);
const data = reactive<{ form: MemberAccountTransactionForm }>({
  form: {
    member_account_id: undefined,
    transaction_type: undefined,
    amount: undefined,
    particular: undefined,
  },
});

const isSavingsTransaction = computed(() =>
  [ActionTransactionType.DepositSavings, ActionTransactionType.WithdrawSavings].includes(
    data.form.transaction_type as ActionTransactionType
  )
);

const rules = computed(() => ({
  transaction_type: { required },
  amount: { required },
  member_account_id: {
    requiredIf: requiredIf(isSavingsTransaction.value),
  },
  particular: {
    requiredIf: requiredIf(isSavingsTransaction.value),
  },
}));

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
    const { data: acc } = await UtilityService.getmemberAcountDropdown(props.memberId?.toString() ?? '', {
      type: AccountType.SAVINGS,
    });
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
