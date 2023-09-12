<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Transaction"
    :style="{ width: '40vw' }"
    @hide="handleHide"
  >
    <AccountTransactionForm
      :member-id="memberId"
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
        @click="handleMakeTransaction"
        :loading="loadings.saving"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import type { MemberAccountTransactionForm } from '@/types/ui/members';
import AccountTransactionForm from './AccountTransactionForm.vue';
import Button from 'primevue/button';
import useValidation from '@/composables/useValidation';
import MembersService from '@/service/MembersService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { useConfirm } from 'primevue/useconfirm';

interface Props {
  visible: boolean;
  memberId?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<{ form: MemberAccountTransactionForm }>({
  form: {},
});
const showModal = ref(false);
const confirm = useConfirm();

const { validation } = useValidation();
const { showApiError, showSuccess } = useAlert();

const loadings = ref({
  saving: false,
});

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
  }
);

const handleMakeTransaction = async () => {
  if (!(await validation.value?.$validate()) || loadings.value.saving) return;
  try {
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Add Transaction',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        loadings.value.saving = true;

        await MembersService.postAddAccountTransaction(model.form?.member_account_id ?? '', {
          transaction_type: model.form?.transaction_type,
          amount: model.form?.amount,
          particular: model.form?.particular,
        });
        showSuccess('Transaction successfullly added.');

        loadings.value.saving = false;
        showModal.value = false;
      },
    });
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const handleHide = () => {
  model.form = {};
};
</script>
