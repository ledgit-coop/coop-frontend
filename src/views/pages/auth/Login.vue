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
              v-model="email"
              type="text"
              autocomplete="null"
              placeholder="Email address"
              class="w-full md:w-30rem"
              style="padding: 1rem"
              @keydown.enter="handleLoginClick"
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
              class="w-full mb-3"
              input-class="w-full"
              @keydown.enter="handleLoginClick"
              :input-style="{ padding: '1rem' }"
            ></Password>

            <div class="mb-5">
              <FieldErrorMessage
                :validation="validation"
                class="block mt-2"
                field="password"
              />
            </div>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox
                  id="rememberme1"
                  v-model="rememberMe"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                @click="handleForgotPasswordClick"
                >Forgot password?</a
              >
            </div>
            <Button
              label="Sign In"
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
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import AuthService from '@/service/AuthService';
import TokenService from '@/service/TokenService';
import { useRouter } from 'vue-router';
import { ROUTE_NAME_FORGOT_PASSWORD } from '@/constants';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import useAlert from '@/composables/useAlert';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import Label from '@/components/Label.vue';

const { layoutConfig } = useLayout();
const router = useRouter();
const { showApiError } = useAlert();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMsg = ref('');
const isSumitted = ref(false);

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const form = computed(() => ({
  email: email.value,
  password: password.value,
}));

const { validation, mapExternalErrorsApi } = useValidation({
  rules: {
    email: { required },
    password: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const handleLoginClick = async () => {
  validation.value?.$reset();
  await validation.value?.$validate();
  if (validation.value?.$invalid) return;
  if (!isSumitted.value) {
    isSumitted.value = true;
    const payload = {
      email: email.value,
      password: password.value,
    };
    AuthService.login(payload)
      .then(({ data }) => {
        if (rememberMe.value) {
          AuthService.setCookie(email.value);
        }
        TokenService.setAuthToken(data.token);
        TokenService.setAuthUser(data.user);

        // Redirect to dashboard
        router.push({ name: 'dashboard' });
      })
      .catch((error: any) => {
        showApiError(error, 'Failed to login');
        mapExternalErrorsApi(error);
      })
      .finally(() => {
        isSumitted.value = false;
      });
  }
};

const handleForgotPasswordClick = () => {
  router.push({ name: ROUTE_NAME_FORGOT_PASSWORD });
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
