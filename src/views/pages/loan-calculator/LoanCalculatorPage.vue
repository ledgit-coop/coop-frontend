<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Calculator" />
        <div class="p-fluid formgrid grid align-items-center pt-5">
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
                  v-model="data.loan_product_id"
                  :input-id="'loan-type' + index"
                  name="loan_type"
                  :value="loan_type.value"
                  @change="handleTypeLoanClick(data.loan_product_id)"
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

          <div class="field col-12 md:col-4">
            <label for="loan_purpose">Amount</label>
            <InputNumber
              :minFractionDigits="2"
              :maxFractionDigits="3"
              id="loan_purpose"
              v-model="data.principal_amount"
              type="text"
            />
          </div>

          <div class="field col-12 md:col-4">
            <label for="name">Released Date</label>
            <Calendar
              date-format="yy-mm-dd"
              mask="true"
              id="applied-date"
              v-model="data.released_date"
              showButtonBar
            />
          </div>

          <LoanTerm
            v-model="data.form"
            :hide-disbursement-channel="true"
            :hide-repayment-mode="true"
            :hide-penalties="true"
          />

          <div class="p-2"></div>
          <LoanFeeForm
            v-model="data.fees"
            :has-savings="true"
            :has-share-cap="true"
          />
          <div class="p-2"></div>
        </div>
        <Button
          label="Calculate"
          :loading="loadings.compute"
          @click="computeLoan"
        />

        <div class="pt-5">
          <PageContentHeader
            title="Loan Summary"
            size="h6"
          ></PageContentHeader>

          <LoanSummary :model-value="loanSummary" />
        </div>

        <div class="pt-5">
          <PageContentHeader
            title="Amortizations"
            size="h6"
          ></PageContentHeader>

          <LoanScheduleTable
            :loading="loadings.compute"
            :loan-calculator="loan_calculator"
            :model-value="loan_calculator?.schedules"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoanFeeForm from '@/components/LoanFeeForm.vue';
import LoanScheduleTable from '@/components/LoanScheduleTable.vue';
import LoanSummary from '@/components/LoanSummary.vue';
import LoanTerm from '@/components/LoanTerm.vue';
import useAlert from '@/composables/useAlert';
import { DATE_FORMAT_DB } from '@/constants';
import { mapLoanProductToTerms } from '@/constants/mapping/loan-products';
import LoanProductService from '@/service/LoanProductService';
import UtilityService from '@/service/UtilityService';
import type { DropdownOption } from '@/types/ui';
import type { LoanProduct, LoanProductFee } from '@/types/ui/loan-products';
import { type LoanCalculator, type LoanSummaryTable, type LoanTermForm } from '@/types/ui/loans';
import PageContentHeader from '@components/PageContentHeader.vue';
import type { AxiosError } from 'axios';
import moment from 'moment';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import { computed, onMounted, reactive, ref } from 'vue';

const data = reactive<{
  form?: LoanTermForm;
  principal_amount?: number;
  released_date?: string;
  loan_product_id?: number;
  fees?: LoanProductFee[];
}>({});

const loadings = ref({
  compute: false,
  loan_products: false,
});
const loanProducts = ref<DropdownOption[]>([]);
const selectedLoanProduct = ref<LoanProduct>();
const loan_calculator = ref<LoanCalculator>();
const loanSummary = computed<LoanSummaryTable[]>(() => [
  {
    released_date: loan_calculator.value?.released_date ?? '',
    first_amortization_date: loan_calculator.value?.amortization_starting_date ?? '',
    maturity_date: loan_calculator.value?.maturity_date ?? '',
    principal: loan_calculator.value?.total_principal ?? 0,
    interest: loan_calculator.value?.total_interest ?? 0,
    payment: loan_calculator.value?.total_payment ?? 0,
    released_amount: loan_calculator.value?.released_amount ?? 0,
    fees: loan_calculator.value?.fees?.map((r) => ({
      name: r.name ?? '',
      amount: r.amount ?? 0,
    })),
  },
]);
const { showApiError } = useAlert();

onMounted(() => {
  getLoanProducts();
});

const computeLoan = async () => {
  loadings.value.compute = true;
  try {
    const { data: computations } = await UtilityService.loanCalculator({
      principal_amount: data.principal_amount,
      loan_interest: data.form?.loan_interest,
      loan_duration: data.form?.loan_duration,
      interest_method: data.form?.interest_method,
      number_of_repayments: data.form?.number_of_repayments,
      repayment_cycle: data.form?.repayment_cycle,
      loan_duration_type: data.form?.loan_duration_type,
      loan_interest_period: data.form?.loan_interest_period,
      released_date: moment(data.released_date).format(DATE_FORMAT_DB),
      next_payroll_date: data.form?.next_payroll_date
        ? moment(data.form?.next_payroll_date).format(DATE_FORMAT_DB)
        : null,
      fees:
        data.fees?.map((r) => ({
          loan_fee_template_id: r.loan_fee_template_id,
          fee: r.fee,
        })) ?? [],
    });

    loan_calculator.value = computations;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.compute = false;
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

const getLoanProduct = async (id: number) => {
  try {
    loadings.value.loan_products = true;
    const { data: product } = await LoanProductService.show(id);
    data.form = mapLoanProductToTerms(product);
    selectedLoanProduct.value = product;
    data.fees = product.loan_product_fees;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const handleTypeLoanClick = (id: any) => {
  getLoanProduct(id);
};
</script>
