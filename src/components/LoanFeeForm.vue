<template>
  <div
    v-if="feeTemplates.length"
    class="col-12"
  >
    <PageContentHeader
      title="Fees"
      size="h6"
    ></PageContentHeader>
  </div>
  <div
    v-if="loadings.fetch"
    class="col-12 pb-2"
  >
    <Skeleton class="w-full"></Skeleton>
  </div>

  <div
    v-else
    v-for="(value, key) in data.form"
    class="field col-12 lg:col-4"
    :key="key"
  >
    <label for="name">{{ value.fee_name }}</label>
    <InputNumber
      :minFractionDigits="2"
      :maxFractionDigits="3"
      show-buttons
      v-model="data.form[key].value"
      :placeholder="placeholderFeeMethod(value.fee_method ?? '')"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import PageContentHeader from './PageContentHeader.vue';
import type InputNumber from 'primevue/inputnumber';
import UtilityService from '@/service/UtilityService';
import type { LoanFeeJSON, LoanFeeTemplateForm } from '@/types/ui/loan-fee-templates';
import { LoanFeeMethod } from '@/constants/ui/loan-fee-templates';
import Skeleton from 'primevue/skeleton';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { deepClone } from '@/helpers';

interface Props {
  modelValue?: LoanFeeTemplateForm[];
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const data = reactive<{ form: LoanFeeJSON[] }>({
  form: [],
});

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
          value: f.fee,
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
    const ou = props.modelValue?.find((r) => r.loan_fee_template_id === element.fee_id);

    if (ou) data.form[index].value = ou.fee;
    else data.form[index].value = element.value;
  }
};
</script>
