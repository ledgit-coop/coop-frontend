<template>
  <Dialog
    v-model:visible="showModal"
    class="p-dialog-maximized"
    modal
    :style="{ width: '100vw' }"
    header="Loan Collections"
  >
    <iframe
      ref="reportFrame"
      class="border-0 w-full h-screen"
      frameBorder="0"
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
        icon="pi pi-save"
        autofocus
        @click="handleDownload"
        :loading="loadings.export"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import LoanRepaymentService from '@/service/LoanRepaymentService';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import useAlert from '@/composables/useAlert';

interface Props {
  visible: boolean;
  params?: any;
}

const { showApiError } = useAlert();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const showModal = ref(false);
const loadings = ref({
  export: false,
});
const reportFrame = ref();

onMounted(() => {
  showModal.value = props.visible ?? false;
});

watch(showModal, (value) => {
  emit('update:visible', value);
  if (value) loanView();
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

const handleDownload = async () => {
  if (!loadings.value.export) {
    loadings.value.export = true;
    await LoanRepaymentService.collectionsExport({})
      .then(({ data }) => {
        var div = document.createElement('div');
        div.innerHTML = data.view;

        var opt = {
          margin: 5,
          image: { type: 'png', quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { format: 'a4', orientation: 'landscape' },
          filename: `loan-collections.pdf`,
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(div).save();
      })
      .catch((error) => {
        showApiError(error);
      })
      .finally(() => {
        loadings.value.export = false;
      });
  }
};

const loanView = () => {
  LoanRepaymentService.collectionsExport({}).then((r) => {
    reportFrame.value.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(r.data.view);
  });
};
</script>
