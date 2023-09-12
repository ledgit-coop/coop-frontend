import type { Validation } from '@vuelidate/core';
import { watch } from 'vue';

export default {
  beforeMount(el: any, binding: any) {
    const field = el.getAttribute('validate');
    if (field) {
      const validation = binding.value as Validation;
      watch(
        () => validation[field]?.$error,
        (value: any) => {
          if (value)
            setTimeout(() => {
              el.classList.add('p-invalid');
            }, 200);
        },
        {
          deep: true,
        }
      );
    }
  },
};
