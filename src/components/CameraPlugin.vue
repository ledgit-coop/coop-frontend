<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Camera Plugin"
    :style="{ width: '50vw' }"
  >
    <div class="flex gap-2">
      <WebCamUI
        :shutterEffect="true"
        @photoTaken="photoTaken"
      />
      <Image
        width="300"
        :src="image"
      />
    </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Done"
        icon="pi pi-check"
        autofocus
        @click="handleDone"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Image from 'primevue/image';
import { ref, watch } from 'vue';
import { WebCamUI } from 'vue-camera-lib';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'imageTaken']);
const image = ref('/images/default-user.png');
const showModal = ref(false);
showModal.value = props.visible ?? false;

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);
const photoTaken = (value: any) => {
  image.value = value.image_data_url;
};
const handleDone = () => {
  emit('imageTaken', { image_data_url: image.value });
  showModal.value = false;
};
</script>
