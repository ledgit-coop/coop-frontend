<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add User"
    :style="{ width: '30vw' }"
  >
    <UsersForm />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Save"
        icon="pi pi-save"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import UsersForm from './components/UsersForm.vue';

interface Props {
  visible: boolean;
  userId?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const showModal = ref(false);

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);
</script>
