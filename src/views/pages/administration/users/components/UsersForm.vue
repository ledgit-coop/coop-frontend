<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="name"
        required
        >Name</Label
      >
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12">
      <Label
        for="name"
        required
        >Email</Label
      >
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12">
      <Label
        for="name"
        required
        >Password</Label
      >
      <InputText
        id="lastname2"
        type="password"
      />
    </div>

    <div class="field col-12">
      <Label
        for="name"
        required
        >Confirm Password</Label
      >
      <InputText
        id="lastname2"
        type="password"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
</script>
