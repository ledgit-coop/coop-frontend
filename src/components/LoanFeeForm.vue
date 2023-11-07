<template>
  <Panel
    v-if="feeTemplates.length"
    class="col-12"
    :collapsed="collapsed"
    header="Fees"
    toggleable
  >
    <Skeleton
      v-if="loadings.fetch"
      class="w-full"
    />

    <div
      v-else
      class="grid p-fluid formgrid"
    >
      <template
        v-for="(value, key) in data.form"
        :key="key"
      >
        <div class="field col-12 lg:col-4">
          <Label
            :help-text="helpText(value)"
            :help-text-severity="
              (value.credit_regular_savings && !hasSavings) || (value.credit_share_capital && !hasShareCap)
                ? 'danger'
                : undefined
            "
            for="name"
            >{{ value.fee_name }}</Label
          >
          <InputNumber
            :minFractionDigits="2"
            :maxFractionDigits="3"
            :disabled="(value.credit_regular_savings && !hasSavings) || (value.credit_share_capital && !hasShareCap)"
            show-buttons
            v-model="data.form[key].value"
            :placeholder="placeholderFeeMethod(value.fee_method ?? '')"
          />
        </div>
      </template>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import type InputNumber from 'primevue/inputnumber';
import UtilityService from '@/service/UtilityService';
import type { LoanFeeJSON, LoanFeeTemplateForm } from '@/types/ui/loan-fee-templates';
import { LoanFeeMethod } from '@/constants/ui/loan-fee-templates';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { deepClone } from '@/helpers';
import Panel from 'primevue/panel';
import Skeleton from 'primevue/skeleton';
import Label from './Label.vue';

interface Props {
  modelValue?: LoanFeeTemplateForm[];
  collapsed?: boolean;
  hasSavings?: boolean;
  hasShareCap?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: LoanFeeJSON[] }>({
  form: [],
});

const helpText = (fee: LoanFeeJSON) => {
  if (fee.credit_regular_savings) return 'Field will disable when the member has no regular savings account.';
  else if (fee.credit_share_capital) return 'Field will disable when the member has no share capital account.';

  return undefined;
};
const feeTemplates = ref<LoanFeeJSON[]>([]);

const loadings = ref({
  fetch: false,
});
const { showApiError } = useAlert();
const placeholderFeeMethod = (fee_type?: string) => {
  if (fee_type === LoanFeeMethod.FIX_AMOUNT) return 'Fix Amount';
  else if (fee_type === LoanFeeMethod.PERCENTAGE) return '%';

  return '';
};

const loadFees = async () => {
  loadings.value.fetch = true;
  try {
    const { data: fees } = await UtilityService.getLoanFees();
    const mapped = fees.map(
      (f) =>
        ({
          fee_id: f.id,
          fee_name: f.name,
          fee_method: f.fee_method,
          fee_type: f.fee_type,
          value:
            (f.credit_regular_savings && !props.hasSavings) || (f.credit_share_capital && !props.hasShareCap)
              ? 0
              : f.fee,
          credit_regular_savings: f.credit_regular_savings,
          credit_share_capital: f.credit_share_capital,
        } as LoanFeeJSON)
    );

    // @Note: need to use deep clone to unbind two objects
    feeTemplates.value = deepClone<LoanFeeJSON[]>(mapped); // Keep original
    data.form = deepClone<LoanFeeJSON[]>(mapped);

    updateData();
  } catch (error) {
    showApiError(error as AxiosError);
  }

  loadings.value.fetch = false;
};

onMounted(() => {
  loadFees();
});

watch(
  () => data.form,
  (value) => {
    emit(
      'update:modelValue',
      value.map((r) => ({
        loan_fee_template_id: r.fee_id,
        fee: r.value,
      }))
    );
  },
  {
    deep: true,
  }
);

watch(
  () => props.modelValue,
  () => {
    updateData();
  }
);

const updateData = () => {
  for (let index = 0; index < feeTemplates.value.length; index++) {
    const element = feeTemplates.value[index];
    const ou = props.modelValue?.find((r) => Number(r.loan_fee_template_id) === Number(element.fee_id));

    if (ou) data.form[index].value = ou.fee;
    else data.form[index].value = element.value;
  }
};
</script>
