<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="isEditing ? 'Edit Loan Product' : 'Add Loan Product'"
    :style="{ width: '50vw' }"
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
    <LoanProductSaveForm
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
import LoanProductSaveForm from './components/LoanProductSaveForm.vue';
import type { LoanProductForm } from '@/types/ui/loan-products';
import LoanProductService from '@/service/LoanProductService';
import {
  mapLoanProductToProductSavePayload,
  mapProductSavePayloadToLoanProduct,
} from '@/constants/mapping/loan-products';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
interface Props {
  visible: boolean;
  id?: number;
}

const { showApiError, showSuccess } = useAlert();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const model = ref<{ form: LoanProductForm }>({ form: {} });
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

    if (props.id) loadProduct();
  }
);

const handleSaveClick = async () => {
  loadings.value.save = true;
  try {
    if (!isEditing.value) await LoanProductService.store(mapLoanProductToProductSavePayload(model.value.form));
    else await LoanProductService.update(props.id ?? 0, mapLoanProductToProductSavePayload(model.value.form));

    showSuccess('Loan product successfully saved.');
    showModal.value = false;
    emit('updated');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const loadProduct = async () => {
  loadings.value.fetch = true;
  try {
    const { data } = await LoanProductService.show(props.id ?? 0);
    model.value.form = mapProductSavePayloadToLoanProduct(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch = false;
};
</script>
