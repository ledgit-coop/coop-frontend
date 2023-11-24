<template>
  <Panel
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
import { reactive, ref, watch } from 'vue';
import type InputNumber from 'primevue/inputnumber';
import type { LoanFeeJSON, LoanFeeTemplateForm } from '@/types/ui/loan-fee-templates';
import { LoanFeeMethod } from '@/constants/ui/loan-fee-templates';
import Panel from 'primevue/panel';
import Skeleton from 'primevue/skeleton';
import Label from './Label.vue';
import { debounce } from 'lodash';
import { deepClone } from '@/helpers';

interface Props {
  modelValue?: LoanFeeTemplateForm[];
  collapsed?: boolean;
  hasSavings?: boolean;
  hasShareCap?: boolean;
  feeTemplates?: LoanFeeJSON[];
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

const loadings = ref({
  fetch: false,
});
const placeholderFeeMethod = (fee_type?: string) => {
  if (fee_type === LoanFeeMethod.FIX_AMOUNT) return 'Fix Amount';
  else if (fee_type === LoanFeeMethod.PERCENTAGE) return '%';

  return '';
};

watch(
  () => props.feeTemplates,
  (mapped) => {
    if (mapped) {
      data.form = deepClone<LoanFeeJSON[]>(mapped);
      updateData();
    }
  }
);

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

const updateData = debounce(() => {
  if (props.feeTemplates)
    for (let index = 0; index < props.feeTemplates.length; index++) {
      const element = props.feeTemplates[index];
      const ou = props.modelValue?.find((r) => Number(r.loan_fee_template_id) === Number(element.fee_id));

      if (element.credit_share_capital === true && !props.hasShareCap) data.form[index].value = 0;
      else if (element.credit_regular_savings === true && !props.hasSavings) data.form[index].value = 0;
      else if (ou) data.form[index].value = ou.fee;
      else data.form[index].value = element.value;
    }
});
</script>
