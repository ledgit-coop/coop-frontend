<template>
  <Dialog
    @hide="handleHide"
    v-model:visible="showModal"
    modal
    :header="props.transactionSubTypeId ? 'Edit Transaction Type' : 'Add Transaction Type'"
    :style="{ width: '30vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label
          for="name"
          required
          >Name</Label
        >
        <InputText
          v-model="data.form.name"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="name"
        />
      </div>

      <div class="field col-12">
        <Label
          required
          for="type"
          >Type</Label
        >
        <Dropdown
          showClear
          id="type"
          :options="types"
          optionLabel="label"
          option-value="value"
          v-model="data.form.type"
          option-disabled="disabled"
          placeholder="Transaction Type Type"
          class="w-full"
          validate="type"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="type"
        />
      </div>
    </div>

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
        @click="handleSave"
        :loading="loadings.save || loadings.fetch"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import { TransactionSubTypeTypes } from '@/constants/ui/transaction-types';

import TransactionTypeService from '@/service/TransactionTypeService';
import type { DropdownOption } from '@/types/ui';
import Dropdown from 'primevue/dropdown';
import { createSlug } from '@/helpers';
import type { TransactionSubTypeSaveForm } from '@/types/ui/transaction-type';
import type { TransactionSubTypePayload } from '@/types/api/transaction-types';

interface Props {
  visible: boolean;
  transactionSubTypeId?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const { showApiError, showError, showSuccess } = useAlert();
const data = reactive<{ form: TransactionSubTypeSaveForm }>({
  form: {},
});
const loadings = ref({
  save: false,
  fetch: false,
});
const isEditing = ref(false);
const form = computed(() => data.form);

const types = ref<DropdownOption[]>([
  { label: 'Expenses', value: TransactionSubTypeTypes.EXPENSES },
  { label: 'Liabilities', value: TransactionSubTypeTypes.LIABILITIES },
  { label: 'Revenues', value: TransactionSubTypeTypes.REVENUE },
  { label: 'Receivables', value: TransactionSubTypeTypes.RECEIVABLES },
  { label: 'Payables', value: TransactionSubTypeTypes.PAYABLES },
]);

const { validation } = useValidation({
  rules: {
    name: { required },
    type: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
  if (!showModal) isEditing.value = false;
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

watch(
  () => props.transactionSubTypeId,
  (value) => {
    if (value) {
      loadTransactionType();
      isEditing.value = true;
    }
  }
);

const loadTransactionType = async () => {
  loadings.value.fetch = true;
  try {
    const { data: transactionType } = await TransactionTypeService.show(Number(props.transactionSubTypeId ?? 0));
    // @ts-ignore
    data.form = {
      ...(transactionType ?? {}),
    };
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch = false;
};

const handleSave = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  loadings.value.save = true;
  try {
    const payload: TransactionSubTypePayload = {
      ...(data.form ?? {}),
      key: createSlug(data.form.name ?? ''),
    };

    if (isEditing.value) await TransactionTypeService.update(Number(props.transactionSubTypeId ?? 0), payload);
    else await TransactionTypeService.store(payload);
    emit('updated');
    showModal.value = false;
    showSuccess('Transaction type successfully saved.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const handleHide = () => {
  emit('hide');
  data.form = {};
  validation.value?.$reset();
};
</script>
