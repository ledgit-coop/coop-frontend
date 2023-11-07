<template>
  <Dropdown
    showClear
    v-model="guarantor"
    :options="guarantors"
    filter
    option-value="value"
    option-label="label"
    placeholder="Select Guarantor"
    :loading="loading"
    class="w-full"
  >
    <template #option="slotProps">
      <div
        class="flex align-items-center p-2"
        v-tooltip="slotProps.option.extra.twice ? 'The member has already been guaranteed twice!' : undefined"
      >
        <i
          v-if="!slotProps.option.extra.twice"
          class="pi pi-check pr-3 text-green-500"
        ></i>
        <i
          v-else
          class="pi pi-times pr-3 text-red-500"
        ></i>

        <div>{{ slotProps.option.label }}</div>
      </div>
    </template>
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
  memberId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const { showApiError } = useAlert();
const guarantors = ref<GuarantorDropdown[]>([]);
const guarantor = ref<string | number>();
const loading = ref(false);

onMounted(() => {
  if (!props.memberId) loadGuarantors();
});

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

watch(
  () => props.memberId,
  () => {
    loadGuarantors();
  }
);

onMounted(() => {
  guarantor.value = props.modelValue ?? undefined;
});

const loadGuarantors = async () => {
  loading.value = true;
  try {
    var { data: list } = await UtilityService.getGuarantors({ member_id: props.memberId });
    guarantors.value = list;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loading.value = false;
};
</script>
