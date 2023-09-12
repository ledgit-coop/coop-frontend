import { type Ref } from 'vue';
import useValidate, { type GlobalConfig, type Validation } from '@vuelidate/core';

interface Params {
  rules?: any;
  model?: Ref<any>;
  globalConfig?: GlobalConfig;
}

export default function useValidation(params?: Params) {
  let validation: Ref<Validation | undefined> = useValidate(params?.rules ?? {}, params?.model, {
    ...params?.globalConfig,
    $autoDirty: true,
  });

  return {
    validation,
  };
}
