<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <label for="name">Account</label>
      <Dropdown
        :options="accounts"
        filter
        option-value="id"
        option-label="name"
        placeholder="Select Account"
        class="w-full"
      >
      </Dropdown>
    </div>

    <div class="field col-12 mt-2">
      <h6>Transaction Type</h6>
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.application_type"
            input-id="application-type"
            name="loan_type"
            value="new"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Withdrawal</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.application_type"
            input-id="application-type"
            name="loan_type"
            value="renew"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Deposit</label
          >
        </div>
      </div>
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Amount</label>

      <InputNumber
        input-id="locale-user"
        :min-fraction-digits="2"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Particular</label>
      <InputText
        id="loan_purpose"
        type="text"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MemberLoanApplication } from '@/types/ui/members';
import { onMounted, reactive, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import type { DropdownOption } from '@/types/ui';
import type { Account } from '@/types/ui/accounts';

interface Props {
  modelValue?: MemberLoanApplication;
  accounts: Account[];
  members: DropdownOption[];
  disableMember?: boolean;
}

const data = reactive<{ form: MemberLoanApplication }>({
  form: {
    loan_type: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const props = defineProps<Props>();

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
</script>
