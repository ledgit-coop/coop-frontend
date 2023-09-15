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

          <div class="field col-12 md:col-6">
            <label for="loan_purpose">Amount</label>
            <InputNumber
              id="loan_purpose"
              v-model="data.principal_amount"
              type="text"
            />
          </div>

          <div class="field col-12 md:col-6">
            <label for="name">Released Date</label>
            <Calendar
              pattern="dd-MM-yyyy"
              mask="true"
              id="applied-date"
              v-model="data.released_date"
            />
          </div>

          <LoanTerm
            v-model="data.form"
            :hide-disbursement-channel="true"
            :hide-repayment-mode="true"
          />
        </div>
        <Button
          label="Calculate"
          :loading="loadings.compute"
          @click="computeLoan"
        />

        <div class="pt-5">
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
import LoanScheduleTable from '@/components/LoanScheduleTable.vue';
import LoanTerm from '@/components/LoanTerm.vue';
import useAlert from '@/composables/useAlert';
import { DATE_FORMAT_DB } from '@/constants';
import { mapLoanProductToTerms } from '@/constants/mapping/loan-products';
import LoanProductService from '@/service/LoanProductService';
import UtilityService from '@/service/UtilityService';
import type { DropdownOption } from '@/types/ui';
import type { LoanCalculator, LoanTermForm } from '@/types/ui/loans';
import PageContentHeader from '@components/PageContentHeader.vue';
import type { AxiosError } from 'axios';
import moment from 'moment';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import { onMounted, reactive, ref } from 'vue';

const data = reactive<{
  form?: LoanTermForm;
  principal_amount?: number;
  released_date?: string;
  loan_product_id?: number;
}>({});

const loadings = ref({
  compute: false,
  loan_products: false,
});
const loanProducts = ref<DropdownOption[]>([]);

const loan_calculator = ref<LoanCalculator>();
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
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.loan_products = false;
};

const handleTypeLoanClick = (id: any) => {
  getLoanProduct(id);
};
</script>
