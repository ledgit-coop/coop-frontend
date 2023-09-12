<template>
  <div class="grid p-fluid formgrid">
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
            :loading="loadings.members"
            @change="handleChangeMember"
          >
          </Dropdown>
        </div>

        <div class="field col-12">
          <label for="contact_number">Contact Number</label>
          <InputText
            v-model="data.form.contact_number"
            id="contact-number"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="age">Age</label>
          <InputNumber
            id="age"
            v-model="data.form.age"
          />
        </div>

        <div class="field col-12">
          <label for="civil_status">Civil Status</label>
          <InputText
            id="civil-status"
            v-model="data.form.civil_status"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="present_address">Present Address</label>
          <InputText
            id="present_address"
            v-model="data.form.present_address"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="home_address">Home Address</label>
          <InputText
            id="home_address"
            v-model="data.form.home_address"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="valid_id">Valid ID</label>
          <InputText
            id="valid_id"
            type="text"
            v-model="data.form.valid_id"
          />
        </div>

        <div class="field col-12">
          <label for="name">Industry</label>
          <Dropdown
            v-model="data.form.work_industry"
            :options="workIndustries"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select Industry"
            class="w-full"
            :loading="loadings.work_industries"
          >
          </Dropdown>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="p-fluid formgrid grid">
        <div class="field col-12">
          <label for="email">Email</label>
          <InputText
            id="email"
            v-model="data.form.email"
            type="email"
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
            v-model="data.form.tin_number"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="number_of_children">Number of Children</label>
          <InputNumber
            id="number_of_children"
            v-model="data.form.number_of_children"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="employer_name">Employer Name</label>
          <InputText
            id="employer_name"
            v-model="data.form.employer_name"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="occupation">Occupation</label>
          <InputText
            id="occupation"
            v-model="data.form.occupation"
            type="text"
          />
        </div>

        <div class="field col-12">
          <label for="work_address">Work Address</label>
          <InputText
            id="work_address"
            v-model="data.form.work_address"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="col-12">
      <PageContentHeader
        title="Salary Range"
        size="h6"
      ></PageContentHeader>
    </div>
    <div class="field col-12">
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(range, index) in netIncomeList"
          :key="index"
          class="flex align-items-center"
        >
          <RadioButton
            v-model="data.form.salary_range"
            :input-id="'salary-range' + index"
            name="loan_type"
            :value="netIncomeList[index].value"
          />
          <label
            :for="'salary-range' + index"
            class="ml-2"
            >{{ range.label }}</label
          >
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div class="grid p-fluid formgrid">
    <div class="col-12">
      <PageContentHeader
        title="Application Type"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12">
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

    <div class="col-12">
      <PageContentHeader
        title="Type Of Loan Applied"
        size="h6"
      ></PageContentHeader>
    </div>
    <div class="field col-12">
      <div class="flex flex-wrap gap-3">
        <div
          v-if="!loadings.loan_products"
          v-for="(loan_type, index) in loanProducts"
          :key="index"
          class="flex align-items-center"
        >
          <RadioButton
            v-model="data.form.loan_product_id"
            :input-id="'loan-type' + index"
            name="loan_type"
            :value="loan_type.value"
          />
          <label
            :for="'loan-type' + index"
            class="ml-2"
            >{{ loan_type.label }}</label
          >
        </div>

        <Skeleton
          v-else
          width="10rem"
          class="mb-2"
        ></Skeleton>
      </div>
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Amount</label>
      <InputNumber
        id="loan_purpose"
        v-model="data.form.applied_amount"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Purpose</label>
      <InputText
        id="loan_purpose"
        v-model="data.form.loan_purpose"
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
        v-model="data.form.comaker_second"
        name="comaker_second"
      />
    </div>
    <div class="field col-12 md:col-6">
      <label for="name">Account</label>
      <Dropdown
        v-model="data.form.member_account_id"
        :options="accounts"
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Account"
        :loading="loadings.accounts"
        class="w-full"
      >
      </Dropdown>
      <small
        class="flex align-items-center pt-1"
        id="username-help"
        ><i class="pi pi-info-circle pr-2"></i> Create account if not exists.</small
      >
    </div>
  </div>

  <hr />
  <div class="grid p-fluid formgrid">
    <LoanTerm v-model="data.form.loan_term" />
  </div>

  <div class="p-1"></div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { DropdownOption, CheckBoxOption } from '@/types/ui';
import ComakerSearch from './ComakerSearch.vue';
import LoanTerm from './LoanTerm.vue';
import PageContentHeader from './PageContentHeader.vue';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { SalaryRange } from '@/constants/ui/loans';
import InputNumber from 'primevue/inputnumber';
import Skeleton from 'primevue/skeleton';
import type { LoanForm } from '@/types/ui/loans';

interface Props {
  modelValue?: LoanForm;
  disableMember?: boolean;
}

const loadings = ref({
  members: false,
  work_industries: false,
  loan_products: false,
  accounts: false,
});

const { showApiError } = useAlert();
const netIncomeList = computed<CheckBoxOption[]>(() => {
  return Object.values(SalaryRange).map((salary) => ({
    label: salary.toString(),
    value: salary.toString(),
  }));
});

const accounts = ref<DropdownOption[]>([]);
const members = ref<DropdownOption[]>([]);
const workIndustries = ref<DropdownOption[]>([]);
const loanProducts = ref<DropdownOption[]>([]);
const data = reactive<{ form: LoanForm }>({
  form: {
    comaker_second: 'test',
  },
});

const emit = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

onMounted(() => {
  data.form = props.modelValue ?? {};

  getMembers();
  getWorkIndustries();
  getLoanProducts();
});

watch(
  () => data.form,
  () => {
    emit('update:modelValue', data.form);
  },
  { deep: true }
);

watch(
  () => data.form.member_id,
  (value) => {
    getMemberAccount(value ?? '');
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

const getMembers = async () => {
  try {
    loadings.value.members = true;
    const { data: dropdown } = await UtilityService.getMemembersDropdown();
    members.value = dropdown;
    loadings.value.members = false;
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const getWorkIndustries = async () => {
  try {
    loadings.value.work_industries = true;
    const { data: dropdown } = await UtilityService.getWorkIndustriesDropdown();
    workIndustries.value = dropdown;
    loadings.value.work_industries = false;
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const getLoanProducts = async () => {
  try {
    loadings.value.loan_products = true;
    const { data: dropdown } = await UtilityService.getLoanProducts();
    loanProducts.value = dropdown;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const getMemberAccount = async (member_id: string) => {
  try {
    loadings.value.accounts = true;
    const { data: dropdown } = await UtilityService.getmemberAcountDropdown(member_id);
    accounts.value = dropdown;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.accounts = false;
};

const handleChangeMember = (value: DropdownOption) => {
  data.form.member_id = value.value;
};
</script>
