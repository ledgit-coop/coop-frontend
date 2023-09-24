<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="isEditing ? 'Edit Loan Fee' : 'Add Loan Fee'"
    :style="{ width: '50vw' }"
    @hide="handleHide"
  >
    <template v-if="loadings.fetch">
      <Skeleton class="mb-2 full-width"></Skeleton>
      <Skeleton class="mb-2 full-width"></Skeleton> <Skeleton class="mb-2 full-width"></Skeleton>
      <Skeleton class="mb-2 full-width"></Skeleton> <Skeleton class="mb-2 full-width"></Skeleton>
      <Skeleton
        height="150px"
        class="mb-2 full-width"
      ></Skeleton>

      <Skeleton
        height="150px"
        class="mb-2 full-width"
      ></Skeleton>

      <Skeleton
        height="20px"
        class="mb-2 full-width"
      ></Skeleton>
    </template>
    <LoanFeeSaveForm
      v-else
      v-model="model.form"
    />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Save"
        icon="pi pi-save"
        @click="handleSaveClick"
        :loading="loadings.save || loadings.fetch"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import LoanFeeSaveForm from './components/LoanFeeSaveForm.vue';
import type { LoanFeeForm } from '@/types/ui/loan-fee-templates';
import LoanFeeTemplateService from '@/service/LoanFeeTemplateService';
import { mapLoanFeeToLoanFeeSavePayload, mapLoanFeeSavePayloadToLoanFee } from '@/constants/mapping/loan-fee-templates';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
interface Props {
  visible: boolean;
  id?: number;
}

const { showApiError, showSuccess } = useAlert();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const model = ref<{ form: LoanFeeForm }>({ form: {} });
const showModal = ref(false);
const loadings = ref({
  save: false,
  fetch: false,
});
const isEditing = computed(() => !!props.id);

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;

    if (props.id) loadFee();
  }
);

const handleSaveClick = async () => {
  loadings.value.save = true;
  try {
    if (!isEditing.value) await LoanFeeTemplateService.store(mapLoanFeeToLoanFeeSavePayload(model.value.form));
    else await LoanFeeTemplateService.update(props.id ?? 0, mapLoanFeeToLoanFeeSavePayload(model.value.form));

    showSuccess('Loan fee successfully saved.');
    showModal.value = false;
    emit('updated');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const loadFee = async () => {
  loadings.value.fetch = true;
  try {
    const { data } = await LoanFeeTemplateService.show(props.id ?? 0);
    model.value.form = mapLoanFeeSavePayloadToLoanFee(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch = false;
};

const handleHide = () => {
  model.value.form = {};
  emit('hide');
};
</script>
