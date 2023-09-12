<template>
  <div>
    <input
      type="text"
      v-model="model.name"
    />
    <Cthree />
  </div>
</template>
<script lang="ts" setup>
import { inject, ref } from 'vue';
import { type Ref } from 'vue';
import useValidate, { type Validation } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Cthree from './Cthree.vue';

const model = ref({
  name: 'test',
});

let validation: Ref<Validation | undefined> = useValidate(
  {
    name: { required },
  },
  model,
  {
    $autoDirty: true,
    $registerAs: 'ctwo',
  }
);
</script>
