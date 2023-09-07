<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Loan Application"
    :style="{ width: '50vw' }"
  >
    <LoanApplicationForm
      v-model="model"
      :members="members"
      :loan-types="loan_types"
      :disable-member="disableMember"
    />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="showModal = false"
      />
      <Button
        label="Submit"
        icon="pi pi-save"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import type { DropdownOption } from '@/types/ui';
import type { LoanType } from '@/types/ui/loans';
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import LoanApplicationForm from './LoanApplicationForm.vue';
import type { MemberLoanApplication } from '@/types/ui/members';
import Button from 'primevue/button';

interface Props {
  visible: boolean;
  memberId?: string;
  disableMember?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<MemberLoanApplication>({});
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

const members = ref<DropdownOption[]>([{ value: '12231', label: 'Kevin Loquencio' }]);

const loan_types = ref<LoanType[]>([
  { id: '1', name: 'Regular Loan', interest_percentage_rate: 1 },
  { id: '2', name: 'Educational Loan', interest_percentage_rate: 2 },
  { id: '3', name: 'Negosyo Loan', interest_percentage_rate: 1 },
  { id: '4', name: 'Quick Cash Loan', interest_percentage_rate: 3.7 },
  { id: '5', name: 'Emergency Loan', interest_percentage_rate: 1.5 },
]);
</script>
