<template>
  <div class="grid p-fluid formgrid">
    <div class="col-12 md:col-6">
      <div class="p-fluid formgrid grid">
        <div class="field col-12">
          <Label
            required
            for="name"
            >Member</Label
          >
          <Dropdown
            showClear
            v-model="data.form.member_id"
            :disabled="disableMember"
            :options="members"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select a Member"
            class="w-full"
            :loading="loadings.members"
            @change="handleChangeMember($event as any)"
            validate="member_id"
            v-validation="validation"
          >
          </Dropdown>

          <FieldErrorMessage
            :validation="validation"
            field="member_id"
          />
        </div>
        <div class="field col-12">
          <Label
            required
            for="contact_number"
            >Contact Number</Label
          >
          <InputText
            v-model="data.form.contact_number"
            id="contact-number"
            type="text"
            validate="contact_number"
            v-validation="validation"
          />
          <FieldErrorMessage
            :validation="validation"
            field="contact_number"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="age"
            >Age</Label
          >
          <InputNumber
            id="age"
            v-model="data.form.age"
            validate="age"
            :use-grouping="false"
            v-validation="validation"
          />
          <FieldErrorMessage
            :validation="validation"
            field="age"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="civil_status"
            >Civil Status</Label
          >

          <Dropdown
            showClear
            v-model="data.form.civil_status"
            :options="civilStatuses"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select Civil Status"
            validate="civil_status"
            v-validation="validation"
            class="w-full"
          >
          </Dropdown>

          <FieldErrorMessage
            :validation="validation"
            field="civil_status"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="present_address"
            >Present Address</Label
          >
          <InputText
            id="present_address"
            v-model="data.form.present_address"
            type="text"
            validate="present_address"
            v-validation="validation"
          />
          <FieldErrorMessage
            :validation="validation"
            field="present_address"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="home_address"
            >Home Address</Label
          >
          <InputText
            id="home_address"
            v-model="data.form.home_address"
            type="text"
            validate="home_address"
            v-validation="validation"
          />
          <FieldErrorMessage
            :validation="validation"
            field="home_address"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="valid_id"
            >Valid ID</Label
          >
          <InputText
            id="valid_id"
            type="text"
            v-model="data.form.valid_id"
            validate="valid_id"
            v-validation="validation"
          />
          <FieldErrorMessage
            :validation="validation"
            field="valid_id"
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
            v-model="data.form.email"
            type="email"
            validate="email"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="email"
          />
        </div>

        <div class="field col-12">
          <Label for="tin_number">TIN Number</Label>
          <InputText
            id="tin_number"
            v-model="data.form.tin_number"
            type="text"
            validate="tin_number"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="tin_number"
          />
        </div>

        <div class="field col-12">
          <Label for="number_of_children">Number of Children</Label>
          <InputNumber
            id="number_of_children"
            v-model="data.form.number_of_children"
            type="text"
            validate="number_of_children"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="number_of_children"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="employer_name"
            >Employer Name</Label
          >
          <InputText
            id="employer_name"
            v-model="data.form.employer_name"
            type="text"
            validate="employer_name"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="employer_name"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="occupation"
            >Occupation</Label
          >
          <InputText
            id="occupation"
            v-model="data.form.occupation"
            type="text"
            validate="occupation"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="occupation"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="work_address"
            >Work Address</Label
          >
          <InputText
            id="work_address"
            v-model="data.form.work_address"
            type="text"
            validate="work_address"
            v-validation="validation"
          />

          <FieldErrorMessage
            :validation="validation"
            field="work_address"
          />
        </div>

        <div class="field col-12">
          <Label
            required
            for="name"
            >Industry</Label
          >
          <Dropdown
            showClear
            v-model="data.form.work_industry"
            :options="workIndustries"
            filter
            option-value="value"
            option-label="label"
            placeholder="Select Industry"
            class="w-full"
            :loading="loadings.work_industries"
            validate="work_industry"
            v-validation="validation"
          >
          </Dropdown>

          <FieldErrorMessage
            :validation="validation"
            field="work_industry"
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
      <FieldErrorMessage
        :validation="validation"
        field="salary_range"
      />
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
      <FieldErrorMessage
        :validation="validation"
        field="application_type"
      />
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
            @change="handleTypeLoanClick(data.form.loan_product_id)"
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

      <FieldErrorMessage
        :validation="validation"
        field="loan_product_id"
      />
    </div>

    <div class="col-12 pb-3">
      <InlineMessage
        v-if="allowableLoanAmountMessage"
        severity="warn"
        >{{ allowableLoanAmountMessage }}</InlineMessage
      >
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="applied-amount"
        >Loan Amount</Label
      >
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        id="applied-amount"
        v-model="data.form.applied_amount"
        type="text"
        validate="applied_amount"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="applied_amount"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        for="principal-amount"
        help-text="Please take note that this is just a pre-approval amount and this will be changed later during final approval process."
        >Pre-Approved Amount</Label
      >
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        id="principal-amount"
        v-model="data.form.principal_amount"
        type="text"
        validate="principal_amount"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="principal_amount"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="loan-purpose"
        >Loan Purpose</Label
      >
      <InputText
        id="loan-purpose"
        v-model="data.form.loan_purpose"
        type="text"
        validate="loan_purpose"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="loan_purpose"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        :required="true"
        help-text="Please match the account based on the loan type and if the account did not exists please an account first."
        for="name"
        >Account (Passbook)</Label
      >
      <Dropdown
        showClear
        v-model="data.form.member_account_id"
        :options="accounts"
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Account"
        :loading="loadings.accounts"
        validate="member_account_id"
        v-validation="validation"
        class="w-full"
      >
      </Dropdown>

      <FieldErrorMessage
        :validation="validation"
        field="member_account_id"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="payment_method"
        >Guarantor (1)</Label
      >
      <GuarantorsDropdown
        id="guarantor-first-id"
        v-model="data.form.guarantor_first_id"
        :member-id="data.form.member_id"
        name="guarantor_first_id"
      />
      <FieldErrorMessage
        :validation="validation"
        field="guarantor_first_id"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label for="guarantor-second-id">Guarantor (2)</Label>
      <GuarantorsDropdown
        id="guarantor-second-id"
        v-model="data.form.guarantor_second_id"
        :member-id="data.form.member_id"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="name"
        >Applied Date</Label
      >
      <Calendar
        date-format="yy-mm-dd"
        mask="true"
        id="applied-date"
        v-model="data.form.applied_date"
        validate="applied_date"
        v-validation="validation"
        showButtonBar
      />
      <FieldErrorMessage
        :validation="validation"
        field="applied_date"
      />
    </div>

    <div class="field col-12 md:col-6">
      <Label
        required
        for="name"
        >Released Date</Label
      >
      <Calendar
        date-format="yy-mm-dd"
        mask="true"
        id="applied-date"
        v-model="data.form.released_date"
        validate="released_date"
        v-validation="validation"
        showButtonBar
      />
      <FieldErrorMessage
        :validation="validation"
        field="released_date"
      />
    </div>
  </div>
  <div class="p-2"></div>

  <div class="grid p-fluid formgrid">
    <LoanTerm v-model="data.form.loan_term" />
  </div>

  <div class="p-2"></div>
  <div class="grid p-fluid formgrid">
    <LoanFeeForm v-model="data.form.loan_fees" />
  </div>

  <div class="p-1"></div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { DropdownOption, CheckBoxOption } from '@/types/ui';
import GuarantorsDropdown from './GuarantorsDropdown.vue';
import LoanTerm from './LoanTerm.vue';
import PageContentHeader from './PageContentHeader.vue';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { SalaryRange } from '@/constants/ui/loans';
import InputNumber from 'primevue/inputnumber';
import Skeleton from 'primevue/skeleton';
import type { LoanForm } from '@/types/ui/loans';
import LoanProductService from '@/service/LoanProductService';
import InlineMessage from 'primevue/inlinemessage';
import type { LoanProduct } from '@/types/ui/loan-products';
import { formatNumber } from '@/helpers';
import { mapLoanProductToTerms } from '@/constants/mapping/loan-products';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from './FieldErrorMessage.vue';
import Label from './Label.vue';
import { required } from '@vuelidate/validators';
import LoanFeeForm from './LoanFeeForm.vue';
import { AccountType } from '@/constants/ui/accounts';
import { CivilStatusDropdown } from '@/constants';

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
const civilStatuses = computed(() => CivilStatusDropdown);
const selectedLoanProduct = ref<LoanProduct | undefined>();
const accounts = ref<DropdownOption[]>([]);
const members = ref<DropdownOption[]>([]);
const workIndustries = ref<DropdownOption[]>([]);
const loanProducts = ref<DropdownOption[]>([]);
const data = reactive<{ form: LoanForm }>({
  form: {},
});

const form = computed(() => data.form);
const { validation } = useValidation({
  rules: {
    member_id: { required },
    contact_number: { required },
    age: { required },
    civil_status: { required },
    present_address: { required },
    home_address: { required },
    valid_id: { required },
    work_industry: { required },
    employer_name: { required },
    occupation: { required },
    work_address: { required },
    salary_range: { required },
    application_type: { required },
    loan_product_id: { required },
    applied_amount: { required },
    principal_amount: { required },
    loan_purpose: { required },
    member_account_id: { required },
    guarantor_first_id: { required },
    applied_date: { required },
    released_date: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const allowableLoanAmountMessage = computed(() => {
  const min = selectedLoanProduct.value?.min_principal_amount;
  const max = selectedLoanProduct.value?.max_principal_amount;

  return selectedLoanProduct.value && min && max
    ? `Allowable loan amount is from ${formatNumber(min)} to ${formatNumber(max)}`
    : null;
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
    if (data.form.member_id) getMemberAccount(value ?? '');
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
    selectedLoanProduct.value = undefined;
    loadings.value.loan_products = true;
    const { data: dropdown } = await UtilityService.getLoanProducts();
    loanProducts.value = dropdown;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const getLoanProduct = async (id: number) => {
  try {
    loadings.value.loan_products = true;
    const { data: product } = await LoanProductService.show(id);
    selectedLoanProduct.value = product;
    data.form.loan_term = mapLoanProductToTerms(product);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const handleTypeLoanClick = (id: any) => {
  getLoanProduct(id);
};

const getMemberAccount = async (member_id: string) => {
  try {
    loadings.value.accounts = true;
    const { data: dropdown } = await UtilityService.getmemberAcountDropdown(member_id, {
      type: AccountType.REGULAR,
    });
    accounts.value = dropdown;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.accounts = false;
};

const handleChangeMember = (value: DropdownOption) => {
  data.form.member_id = value.value;
  getMemberAccount(value.value);
};
</script>
