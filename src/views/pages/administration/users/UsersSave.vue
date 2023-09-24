<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="isEditing ? 'Edit User' : 'Add User'"
    :style="{ width: '30vw' }"
    @hide="handleHideSave"
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
          for="name"
          required
          >Email</Label
        >
        <InputText
          id="email"
          v-model="data.form.email"
          type="email"
          :loading="loadings.fetch"
        />
        <FieldErrorMessage
          :validation="validation"
          field="email"
        />
      </div>

      <div class="field col-12">
        <Label
          for="password"
          required
          >Password</Label
        >
        <InputText
          id="password"
          :loading="loadings.fetch"
          v-model="data.form.password"
          type="password"
        />
        <FieldErrorMessage
          :validation="validation"
          field="password"
        />
      </div>

      <div class="field col-12">
        <Label
          for="confirmPassword"
          required
          :loading="loadings.fetch"
          >Confirm Password</Label
        >
        <InputText
          id="confirmPassword"
          v-model="data.form.password_confirmation"
          type="password"
        />
        <FieldErrorMessage
          :validation="validation"
          field="password_confirmation"
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
        :loading="loadings.save"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import type { UserSaveForm } from '@/types/ui/user';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import UsersService from '@/service/UsersService';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';

interface Props {
  visible: boolean;
  userId?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const { showApiError, showError, showSuccess } = useAlert();
const isEditing = computed(() => !!props.userId);
const data = reactive<{ form: UserSaveForm }>({
  form: {},
});
const loadings = ref({
  save: false,
  fetch: false,
});

const form = computed(() => data.form);

const { validation } = useValidation({
  rules: {
    name: { required },
    email: { required },
    password: { required },
    password_confirmation: { required },
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
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

watch(
  () => props.userId,
  (value) => {
    if (value) loadUser();
  }
);

const loadUser = async () => {
  loadings.value.fetch = true;
  try {
    const { data: user } = await UsersService.show(Number(props.userId ?? 0));
    data.form = user;
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
      await UsersService.update(Number(props.userId ?? 0), {
        ...(data.form ?? {}),
      });
    else
      await UsersService.store({
        ...(data.form ?? {}),
      });

    emit('updated');
    showModal.value = false;
    showSuccess('User successfully saved.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const handleHideSave = () => {
  data.form = {};
  validation.value?.$reset();
  emit('hide');
};
</script>
