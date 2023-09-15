<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="!isEditing ? 'Create Loan' : 'Edit Loan'"
    :style="{ width: '50vw' }"
  >
    <template v-if="loadings.fetching">
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
    <LoanApplicationForm
      v-else
      v-model="model.form"
      :disable-member="disableMember"
    />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Submit"
        icon="pi pi-save"
        :loading="loadings.save"
        @click="handleSaveClick"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import LoanApplicationForm from './LoanApplicationForm.vue';
import type { Member } from '@/types/ui/members';
import Button from 'primevue/button';
import type { LoanForm } from '@/types/ui/loans';
import { mapLoanFormToPayload, mapLoanToLoanForm } from '@/constants/mapping/loans';
import LoanService from '@/service/LoanService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import Skeleton from 'primevue/skeleton';
import useValidation from '@/composables/useValidation';

interface Props {
  visible: boolean;
  member?: Member;
  disableMember?: boolean;
  loanIdForEdit?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'saved']);
const { showApiError, showSuccess, showError } = useAlert();

const { validation } = useValidation();
const model = reactive<{ form?: LoanForm }>({
  form: {},
});

const isEditing = computed(() => !!props.loanIdForEdit);
const showModal = ref(false);
const loadings = ref({
  save: false,
  fetching: false,
});

onMounted(() => {
  setMember();
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

watch(
  () => props.member,
  (value) => {
    if (value) setMember();
  },
  {
    deep: true,
  }
);

watch(showModal, (value) => {
  if (value && isEditing.value) loadLoan();
});

const setMember = () => {
  model.form!.member_id = props.member?.id?.toString();
  model.form!.email = props.member?.email_address?.toString();
};

const handleSaveClick = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }

  try {
    loadings.value.save = true;
    if (isEditing.value) await LoanService.update(props.loanIdForEdit ?? 0, mapLoanFormToPayload(model.form!));
    else await LoanService.postLoan(mapLoanFormToPayload(model.form!));
    showSuccess('Loan application saved successfully.');
    showModal.value = false;
    emit('saved');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const loadLoan = async () => {
  loadings.value.fetching = true;
  try {
    const { data } = await LoanService.show(props.loanIdForEdit ?? 0);
    model.form = mapLoanToLoanForm(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetching = false;
};
</script>
