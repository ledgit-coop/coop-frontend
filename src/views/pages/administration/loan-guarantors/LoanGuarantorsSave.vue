<template>
  <Dialog
    @hide="handleHide"
    v-model:visible="showModal"
    modal
    :header="props.guarantorId ? 'Edit Guarantor' : 'Add Guarantor'"
    :style="{ width: '30vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label
          for="name"
          required
          >First Name</Label
        >
        <InputText
          v-model="data.form.first_name"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="first_name"
        />
      </div>

      <div class="field col-12">
        <Label for="name">Middle Name</Label>
        <InputText
          v-model="data.form.middle_name"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="middle_name"
        />
      </div>

      <div class="field col-12">
        <Label
          for="name"
          required
          >Last Name</Label
        >
        <InputText
          v-model="data.form.last_name"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="last_name"
        />
      </div>

      <div class="field col-12">
        <Label
          for="name"
          required
          >Contact</Label
        >
        <InputText
          v-model="data.form.contact"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="contact"
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
import type { LoanGuarantorSaveForm } from '@/types/ui/loan-guarantors';
import LoanGuarantorsService from '@/service/LoanGuarantorsService';

interface Props {
  visible: boolean;
  guarantorId?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const { showApiError, showError, showSuccess } = useAlert();
const data = reactive<{ form: LoanGuarantorSaveForm }>({
  form: {},
});
const loadings = ref({
  save: false,
  fetch: false,
});
const isEditing = ref(false);
const form = computed(() => data.form);

const { validation } = useValidation({
  rules: {
    first_name: { required },
    last_name: { required },
    contact: { required },
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
  () => props.guarantorId,
  (value) => {
    if (value) {
      loadGuarantor();
      isEditing.value = true;
    }
  }
);

const loadGuarantor = async () => {
  loadings.value.fetch = true;
  try {
    const { data: guarantor } = await LoanGuarantorsService.show(Number(props.guarantorId ?? 0));
    // @ts-ignore
    data.form = {
      ...(guarantor ?? {}),
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
    if (isEditing.value)
      await LoanGuarantorsService.update(Number(props.guarantorId ?? 0), {
        ...(data.form ?? {}),
      });
    else
      await LoanGuarantorsService.store({
        ...(data.form ?? {}),
      });
    emit('updated');
    showModal.value = false;
    showSuccess('Guarantor successfully saved.');
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
