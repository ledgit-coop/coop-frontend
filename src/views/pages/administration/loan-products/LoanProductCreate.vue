<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Loan Product"
    :style="{ width: '40vw' }"
  >
    <LoanProductForm />

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
import { onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import LoanProductForm from './components/LoanProductForm.vue';
import type { LoanForm } from '@/types/ui/loans';

interface Props {
  visible: boolean;
  memberId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<LoanForm>({});
const showModal = ref(false);

onMounted(() => {
  setMemberId();
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

watch(
  () => props.memberId,
  () => {
    setMemberId();
  }
);

const setMemberId = () => {
  model.member_id = props.memberId;
};
</script>
