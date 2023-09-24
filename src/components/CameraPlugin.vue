<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Camera Plugin"
    :style="{ width: '50vw' }"
  >
    <TabView @tab-change="handleTabChange">
      <TabPanel header="Uploading">
        <div class="p-2">
          <FileUpload
            chooseLabel="Browse image"
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            @upload="onUpload"
            @select="onUpload"
          />
        </div>
        <VuePictureCropper
          v-if="image"
          :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto',
          }"
          :img="image"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 2 / 2,
          }"
        />
      </TabPanel>
      <TabPanel header="Camera">
        <template v-if="initCamera">
          <WebCamUI
            :shutterEffect="true"
            @photoTaken="photoTaken"
            v-if="!image"
          />

          <VuePictureCropper
            v-else
            :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f8f8',
              margin: 'auto',
            }"
            :img="image"
            :options="{
              viewMode: 1,
              dragMode: 'crop',
              aspectRatio: 2 / 2,
            }"
          />
        </template>
      </TabPanel>
    </TabView>

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
import FileUpload from 'primevue/fileupload';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { ref, watch } from 'vue';
// @ts-ignore
import { WebCamUI } from 'vue-camera-lib';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'imageTaken']);
const image = ref();
const showModal = ref(false);
const initCamera = ref(false);

watch(showModal, (value) => {
  emit('update:visible', value);
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
    image.value = null;
    initCamera.value = false;
  }
);
const photoTaken = (value: any) => {
  image.value = value.image_data_url;
};
const handleDone = () => {
  emit('imageTaken', { image_data_url: cropper?.getDataURL() });
  showModal.value = false;
};

const handleTabChange = (event: any) => {
  initCamera.value = event.index === 1;
};

const onUpload = async (event: any) => {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(event.files[0]);
  });

  image.value = data;
};
</script>
