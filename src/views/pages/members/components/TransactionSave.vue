<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="isEditing ? 'Edit Transaction' : 'Add Transaction'"
    :style="{ width: '30vw' }"
    @hide="handleHide"
  >
    <template v-if="loadings.fetch">
      <Skeleton class="mb-2 full-width"></Skeleton>
      <Skeleton
        height="150px"
        class="mb-2 full-width"
      ></Skeleton>

      <Skeleton
        height="20px"
        class="mb-2 full-width"
      ></Skeleton>
    </template>
    <TransactionEditForm
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
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import type { TransactionForm } from '@/types/ui/transactions';
import { dateFormat } from '@/helpers';
import { DATE_FORMAT_DB } from '@/constants';
import useValidation from '@/composables/useValidation';
import moment from 'moment';
import TransactionEditForm from './TransactionEditForm.vue';
import MembersService from '@/service/MembersService';

interface Props {
  visible: boolean;
  id?: string;
}

const { showApiError, showSuccess, showError } = useAlert();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const model = ref<{ form: TransactionForm }>({ form: {} });
const showModal = ref(false);
const loadings = ref({
  save: false,
  fetch: false,
});
const isEditing = computed(() => !!props.id);

const { validation } = useValidation();

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

    if (value) {
      model.value.form = {};
      validation.value?.$reset();
    }
    if (props.id) loadTransaction();
  }
);

const handleSaveClick = async () => {
  validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  loadings.value.save = true;
  try {
    const payload = {
      particular: model.value.form.particular?.toString() ?? '',
      amount: model.value.form.amount,
      transaction_date: dateFormat(model.value.form.transaction_date, DATE_FORMAT_DB),
    };
    if (isEditing.value) await await MembersService.patchMemberAccountTransaction((props.id ?? 0).toString(), payload);

    showSuccess('Transaction successfully saved.');
    showModal.value = false;
    emit('updated');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const loadTransaction = async () => {
  loadings.value.fetch = true;
  try {
    const { data } = await MembersService.getMemberAccountTrasaction(Number(props.id ?? 0));
    model.value.form = {
      particular: data.particular ?? '',
      transaction_date: moment(data.transaction_date).toDate(),
      amount: data.amount ?? 0,
    };
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch = false;
};

const handleHide = () => {
  emit('hide');
};
</script>
