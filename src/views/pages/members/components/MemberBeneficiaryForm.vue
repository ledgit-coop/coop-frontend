<template>
  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <Label for="name">Name (Last Name, First Name, Middle Name)</Label>
      <InputText
        id="name"
        v-model="model.form.name"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="birthdate">Birthdate</label>
      <Calendar
        showButtonBar
        id="birthdate"
        v-model="model.form.birthdate"
        date-format="yy-mm-dd"
        mask="true"
      />
    </div>
    <div class="flex align-items-center col-12 md:col-4">
      <div class="field">
        <label for="relationship">Relationship</label>
        <InputText
          id="relationship"
          v-model="model.form.relationship"
          type="text"
        />
      </div>

      <Button
        icon="pi pi-trash"
        class="p-button-rounded p-button-danger p-button-text ml-2"
        @click="handleRemoveBeneficiary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MemberFormBeneficiary } from '@/types/ui/members';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import { onMounted, ref, watch } from 'vue';
import Label from '@/components/Label.vue';

interface Props {
  modelValue?: MemberFormBeneficiary;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'update:validated', 'onClickRemove']);

const model = ref<{ form: MemberFormBeneficiary }>({ form: {} });

onMounted(() => {
  if (props.modelValue) model.value.form = props.modelValue;
});

watch(
  () => model.value.form,
  (value: MemberFormBeneficiary) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value?: MemberFormBeneficiary) => {
    if (value) model.value.form = value;
  }
);

const handleRemoveBeneficiary = () => {
  emit('onClickRemove');
};
</script>
