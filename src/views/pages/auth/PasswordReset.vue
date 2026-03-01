<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="w-full lg:w-6 md:w-8 mx-auto px-4">
        <Message
          v-if="errorMsg !== ''"
          severity="error"
          >{{ errorMsg }}
        </Message>
      </div>

      <div
        style="
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-3 sm:px-8">
          <div class="mb-5 grid">
            <img
              :src="logoUrl"
              alt="Ledget Coop Logo"
              class="w-6rem flex-shrink-0"
            />
            <h4 class="ml-2">Dalan Sa-Pag Asenso<br /><small>Credit Cooperative Portal</small></h4>
          </div>
          <div>
            <Label
              for="email1"
              class="block text-900 text-xl font-medium mb-2"
              >Email</Label
            >

            <InputText
              id="email"
              v-model="email"
              type="text"
              autocomplete="off"
              placeholder="Email address"
              class="w-full md:w-30rem"
              disabled
              style="padding: 1rem"
            />

            <div class="mb-5">
              <FieldErrorMessage
                :validation="validation"
                class="block mt-2"
                field="email"
              />
            </div>

            <Label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</Label
            >
            <Password
              id="password"
              v-model="password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              :input-style="{ padding: '1rem' }"
            ></Password>

            <div class="mb-5">
              <FieldErrorMessage
                :validation="validation"
                class="block mt-2"
                field="password"
              />
            </div>

            <Label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Confirm Password</Label
            >
            <Password
              id="password"
              v-model="password_confirmation"
              placeholder="Password Confirm"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              :input-style="{ padding: '1rem' }"
            ></Password>

            <div class="mb-5">
              <FieldErrorMessage
                :validation="validation"
                class="block mt-2"
                field="password_confirmation"
              />
            </div>

            <Button
              label="Reset Password"
              class="w-full p-3 text-xl"
              :loading="isSumitted"
              @click="handleLoginClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onMounted } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import AuthService from '@/service/AuthService';
import Label from '@/components/Label.vue';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import useAlert from '@/composables/useAlert';
import router from '@/router';
import { ROUTE_NAME_LOGIN } from '@/constants';

const { layoutConfig } = useLayout();

const password = ref('');
const email = ref<any>();
const password_confirmation = ref('');
const errorMsg = ref('');
const isSumitted = ref(false);
const token = ref<any>();

const form = computed(() => ({
  password: password.value,
  password_confirmation: password_confirmation.value,
  token: token.value,
  email: email.value,
}));

const { validation, mapExternalErrorsApi, resetExternalErrorsApi } = useValidation({
  rules: {
    password: { required },
    password_confirmation: { required },
    email: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

onMounted(() => {
  const { token: t, email: e } = router.currentRoute.value.query;
  token.value = t;
  email.value = e;
});

const { showApiError, showSuccess } = useAlert();

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const handleLoginClick = async () => {
  resetExternalErrorsApi();
  await validation.value?.$validate();
  if (validation.value?.$invalid) return;

  if (!isSumitted.value) {
    isSumitted.value = true;
    AuthService.resetPassword({ ...form.value })
      .then(() => {
        showSuccess('Password has been successfully updated and you will be redirected to login page.');
        setTimeout(() => {
          router.push({ name: ROUTE_NAME_LOGIN });
        }, 1500);
      })
      .catch((error: any) => {
        showApiError(error, 'Failed to reset password');
        mapExternalErrorsApi(error);
      })
      .finally(() => {
        isSumitted.value = false;
      });
  }
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
