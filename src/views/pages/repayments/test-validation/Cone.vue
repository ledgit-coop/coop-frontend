<template>
  <div>
    <input
      type="text"
      v-model="model.name"
    />
    <Ctwo />
    <button @click="handleClick">Click</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue';
import { type Ref } from 'vue';
import useValidate, { type Validation } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Ctwo from './Ctwo.vue';
import Cthree from './Cthree.vue';

const model = ref({
  name: 'test',
  ctwo: {
    name: 'test',
    cthree: {
      name: 'test',
    },
  },
});

let validation: Ref<Validation | undefined> = useValidate(
  {
    name: { required },
  },
  model,
  {
    $autoDirty: true,
  }
);

provide('validation', validation);

const handleClick = async () => {
  await validation.value?.$validate;
  console.log(validation.value);
};
</script>
