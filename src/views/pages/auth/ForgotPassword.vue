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
              alt="DSPACC Logo"
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
              style="padding: 1rem"
            />

            <div class="mb-3">
              <FieldErrorMessage
                :validation="validation"
                class="block mt-2"
                field="email"
              />
            </div>

            <div class="flex">
              <Button
                label="Request Password Reset"
                class="ml-auto"
                :loading="isSumitted"
                @click="handleLoginClick"
              />
            </div>

            <div class="flex mt-5">
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer ml-auto"
                style="color: var(--primary-color)"
                @click="handleLogin"
                >Back to login</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import AuthService from '@/service/AuthService';
import { useRouter } from 'vue-router';
import Label from '@/components/Label.vue';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import useAlert from '@/composables/useAlert';
import { ROUTE_NAME_LOGIN } from '@/constants';

const { layoutConfig } = useLayout();
const router = useRouter();

const email = ref('');
const errorMsg = ref('');
const isSumitted = ref(false);

const form = computed(() => ({
  email: email.value,
}));

const { validation, mapExternalErrorsApi } = useValidation({
  rules: {
    email: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const { showApiError, showSuccess } = useAlert();

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const handleLoginClick = async () => {
  validation.value?.$reset();
  await validation.value?.$validate();
  if (validation.value?.$invalid) return;
  if (!isSumitted.value) {
    isSumitted.value = true;
    const payload = {
      email: email.value,
    };
    AuthService.requestPasswordReset(payload)
      .then(() => {
        showSuccess('Password reset successfully sent to your email.');
      })
      .catch((error: any) => {
        showApiError(error, 'Failed to request');
        mapExternalErrorsApi(error);
      })
      .finally(() => {
        isSumitted.value = false;
      });
  }
};

const handleLogin = () => {
  router.push({ name: ROUTE_NAME_LOGIN });
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
