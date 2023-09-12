<template>
  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <Label
        required
        for="name"
        >Name (Last Name, First Name, Middle Name)</Label
      >
      <InputText
        id="beneficiary-name"
        v-model="model.name"
        type="text"
      />
      <FieldErrorMessage
        :validation="validation"
        field="surname"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="firstname2">Birthdate</label>
      <Calendar
        v-model="model.birthdate"
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="flex align-items-center col-12 md:col-4">
      <div class="field">
        <label for="lastname2">Relationship</label>
        <InputText
          id="lastname2"
          v-model="model.relationship"
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
import { computed, onMounted, ref, watch } from 'vue';
import { required } from '@vuelidate/validators';
import Label from '@/components/Label.vue';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';

interface Props {
  modelValue?: MemberFormBeneficiary;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'update:validated', 'onClickRemove']);

const model = ref<MemberFormBeneficiary>({});
const form = computed(() => model);
onMounted(() => {
  if (props.modelValue) model.value = props.modelValue;
});

watch(
  () => model.value,
  (value: MemberFormBeneficiary) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value?: MemberFormBeneficiary) => {
    if (value) model.value = value;
  }
);

const rules = computed(() => ({
  name: { required },
  birthdate: { required },
  relationship: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
});

const handleRemoveBeneficiary = () => {
  emit('onClickRemove');
  console.log(validation.value);
};
</script>
