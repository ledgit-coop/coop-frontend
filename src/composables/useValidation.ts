import { ref, type Ref } from 'vue';
import useValidate, { type GlobalConfig, type ServerErrors, type Validation } from '@vuelidate/core';

interface Params {
  rules?: any;
  model?: Ref<any>;
  globalConfig?: GlobalConfig;
}

export default function useValidation(params?: Params) {
  const externalErrors = ref<ServerErrors>({});

  let validation: Ref<Validation | undefined> = useValidate(params?.rules ?? {}, params?.model, {
    ...params?.globalConfig,
    $autoDirty: true,
    $externalResults: externalErrors,
  });

  const mapExternalErrorsApi = (errors: any) => {
    const { data } = errors.response;
    if (data.errors) {
      console.log(data)
      externalErrors.value = { ...data.errors };
    }
  };

  const resetExternalErrorsApi = () => {
    externalErrors.value = {};
  };

  return {
    validation,
    mapExternalErrorsApi,
    resetExternalErrorsApi,
  };
}
