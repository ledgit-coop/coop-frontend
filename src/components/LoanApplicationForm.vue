<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="p-fluid formgrid grid">
        <div class="field col-12">
          <label for="name">Member</label>
          <Dropdown
            v-model="data.form.member_id"
            :disabled="disableMember"
            :options="members"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select a Member"
            class="w-full"
            @change="handleChangeMember"
          >
          </Dropdown>
        </div>

        <div class="field col-12">
          <label for="contact_number">Contact Number</label>
          <InputText
            id="contact_number"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="age">Age</label>
          <InputText
            id="age"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="civil_status">Civil Status</label>
          <InputText
            id="civil_status"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="present_address">Present Address</label>
          <InputText
            id="present_address"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="home_address">Home Address</label>
          <InputText
            id="home_address"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="valid_id">Valid ID</label>
          <InputText
            id="valid_id"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="p-fluid formgrid grid">
        <div class="field col-12">
          <label for="email">Email</label>
          <InputText
            id="email"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="dsspacc_id">DSSP Account ID</label>
          <InputText
            id="dsspacc_id"
            v-model="data.form.member_id"
            type="text"
            :readonly="true"
          />
        </div>

        <div class="field col-12">
          <label for="tin_number">TIN Number</label>
          <InputText
            id="tin_number"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="number_of_children">Number of Children</label>
          <InputText
            id="number_of_children"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="employer_name">Employer Name</label>
          <InputText
            id="employer_name"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="occupation">Occupation</label>
          <InputText
            id="occupation"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="work_address">Work Address</label>
          <InputText
            id="work_address"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="field col-12">
      <h6>Application Type</h6>
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
            >New Applicant</label
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
            >Renewal</label
          >
        </div>
      </div>
    </div>

    <div class="field col-12">
      <h6>Type Of Loan Applied</h6>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(loan_type, index) in loanTypes"
          :key="index"
          class="flex align-items-center"
        >
          <RadioButton
            v-model="data.form.loan_type"
            :input-id="'loan-type' + index"
            name="loan_type"
            :value="loanTypes[index].id"
            @change="handleLoanTypeChange(loanTypes[index])"
          />
          <label
            :for="'loan-type' + index"
            class="ml-2"
            >{{ loan_type.name }}</label
          >
        </div>
      </div>
    </div>
  </div>

  <div class="grid p-fluid formgrid">
    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Amount</label>
      <InputText
        id="loan_purpose"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Purpose</label>
      <InputText
        id="loan_purpose"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_terms">Loan Terms</label>
      <InputText
        id="loan_terms"
        v-model="data.form.loan_terms"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_terms">Loan Interest Rate (%)</label>

      <InputNumber
        v-model="data.form.loan_interest_rate"
        input-id="loan_interest_rate"
        :min-fraction-digits="2"
        :max-fraction-digits="5"
      />

      <small id="username-help">Loan interest can be changed.</small>
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_mode">Payment Mode</label>
      <InputText
        id="payment_mode"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_method">Payment Method</label>
      <InputText
        id="payment_method"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_method">Co-maker (1)</label>
      <ComakerSearch
        id="comaker-first"
        v-model="data.form.comaker_first"
        name="comaker_first"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_method">Co-maker (2)</label>
      <ComakerSearch
        id="comaker-second"
        name="comaker_second"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MemberLoanApplication } from '@/types/ui/members';
import { onMounted, reactive, watch } from 'vue';
import type { LoanType } from '@/types/ui/loans';
import InputNumber from 'primevue/inputnumber';
import type { DropdownOption } from '@/types/ui';
import ComakerSearch from './ComakerSearch.vue';

interface Props {
  modelValue?: MemberLoanApplication;
  loanTypes: LoanType[];
  members: DropdownOption[];
  disableMember?: boolean;
}

const data = reactive<{ form: MemberLoanApplication }>({
  form: {
    loan_type: '',
    comaker_second: 'test',
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

const handleLoanTypeChange = (value: LoanType) => {
  data.form.loan_interest_rate = value.interest_percentage_rate;
};

const handleChangeMember = (value: DropdownOption) => {
  data.form.member_id = value.value;
};
</script>
