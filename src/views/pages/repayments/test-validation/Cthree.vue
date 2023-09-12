<template>
  <div>
    <input
      type="text"
      v-model="model.bossing"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { type Ref } from 'vue';
import useValidate, { type Validation } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const model = ref({
  bossing: 'test',
});

let validation: Ref<Validation | undefined> = useValidate(
  {
    bossing: { required },
  },
  model,
  {
    $autoDirty: true,
    $scope: '__root',
    $registerAs: 'cthree',
  }
);
</script>
