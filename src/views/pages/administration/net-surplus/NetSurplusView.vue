<template>
  <Dialog
    class="net-surplus-dialog"
    @hide="handleHide"
    v-model:visible="showModal"
    modal
    header="View Net Surplus"
    :style="{ width: '50vw' }"
  >
    <iframe
      class="border-0 w-full"
      frameBorder="0"
      style="height: 70vh"
      ref="agreementFrame"
    ></iframe>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Export"
        icon="pi pi-download"
        text
        @click="handleExport"
      />
      <Button
        label="Distribute"
        icon="pi pi-send"
        @click="showModal = false"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import type { NetSurplusSaveForm } from '@/types/ui/net-surplus';
import NetSurplusService from '@/service/NetSurplusService';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';

// @ts-ignore
import html2pdf from 'html2pdf.js';

interface Props {
  visible: boolean;
  netSurplusId?: number;
}

const agreementFrame = ref();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const data = reactive<{ form: NetSurplusSaveForm }>({
  form: {},
});
const loadings = ref({
  fetch: false,
});

const form = computed(() => data.form);
const { showApiError } = useAlert();
const { validation } = useValidation({
  rules: {
    from_date: { required },
    to_date: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

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
    if (showModal.value) loadNetSurplus();
  }
);

const handleExport = async () => {
  try {
    const { data } = await NetSurplusService.show(Number(props.netSurplusId ?? 0));
    var div = document.createElement('div');
    div.innerHTML = data.view;

    var opt = {
      margin: 10,
      image: { type: 'png', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { format: 'letter', orientation: 'landscape' },
      filename: `net-surplus.pdf`,
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(div).save();
  } catch (error) {
    showApiError(error as AxiosError);
  } finally {
    loadings.value.fetch = false;
  }
};

const loadNetSurplus = async () => {
  try {
    const { data } = await NetSurplusService.show(Number(props.netSurplusId ?? 0));
    agreementFrame.value.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(data.view);
  } catch (error) {
    showApiError(error as AxiosError);
  } finally {
    loadings.value.fetch = false;
  }
};

const handleHide = () => {
  emit('hide');
  data.form = {};
  validation.value?.$reset();
};
</script>
<style lang="scss">
.net-surplus-dialog {
  .p-dialog-content {
    overflow: hidden !important;
  }
}
</style>
