<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Transaction"
    :style="{ width: '40vw' }"
  >
    <AccountTransactionForm
      :members="members"
      :accounts="accounts"
    />

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
import type { DropdownOption } from '@/types/ui';
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import type { MemberLoanApplication } from '@/types/ui/members';
import AccountTransactionForm from './AccountTransactionForm.vue';
import type { Account } from '@/types/ui/accounts';

interface Props {
  visible: boolean;
  accountId?: string;
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
  () => props.accountId,
  () => {
    setMemberId();
  }
);

const setMemberId = () => {
  model.member_id = props.accountId;
};

const members = ref<DropdownOption[]>([{ value: '12231', label: 'Kevin Loquencio' }]);

const accounts = ref<Account[]>([
  { id: '1', name: 'Regular Loan Account' },
  { id: '2', name: 'Educational Loan Account' },
  { id: '3', name: 'Share Capital Account' },
  { id: '4', name: 'Savings Account' },
  { id: '5', name: 'Kiddie Savings Account' },
]);
</script>
