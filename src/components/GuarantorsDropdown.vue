<template>
  <Dropdown
    showClear
    v-model="guarantor"
    :options="guarantors"
    filter
    option-value="value"
    option-label="label"
    option-disabled="disabled"
    placeholder="Select Guarantor"
    :loading="loading"
    class="w-full"
  >
  </Dropdown>
</template>
<script setup lang="ts">
import useAlert from '@/composables/useAlert';
import UtilityService from '@/service/UtilityService';
import type { GuarantorDropdown } from '@/types/ui';
import type { AxiosError } from 'axios';
import Dropdown from 'primevue/dropdown';
import { onMounted, ref, watch } from 'vue';

interface Props {
  modelValue?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const { showApiError } = useAlert();
const guarantors = ref<GuarantorDropdown[]>([]);
const guarantor = ref<string | number>();
const loading = ref(false);

onMounted(() => {});

watch(
  () => guarantor.value,
  () => {
    emit('update:modelValue', guarantor.value);
  }
);

watch(
  () => props.modelValue,
  () => {
    guarantor.value = props.modelValue ?? undefined;
  }
);

onMounted(() => {
  guarantor.value = props.modelValue ?? undefined;
  loadGuarantors();
});

const loadGuarantors = async () => {
  loading.value = true;
  try {
    var { data: list } = await UtilityService.getGuarantors();
    guarantors.value = list;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loading.value = false;
};
</script>
