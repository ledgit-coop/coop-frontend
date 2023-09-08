<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Account"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <label for="name">Type of Account</label>
        <Dropdown
          :options="accounts"
          filter
          option-value="value"
          option-label="label"
          placeholder="Select Type of Account"
          class="w-full"
        >
        </Dropdown>
      </div>
    </div>

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
import type { MemberLoanApplication } from '@/types/ui/members';
import Button from 'primevue/button';
import type { DropdownOption } from '@/types/ui';

interface Props {
  visible: boolean;
  memberId?: string;
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

const accounts = ref<DropdownOption[]>([
  { value: '1', label: 'Regular Loan Account' },
  { value: '2', label: 'Educational Loan Account' },
  { value: '3', label: 'Share Capital Account' },
  { value: '4', label: 'Savings Account' },
  { value: '5', label: 'Kiddie Savings Account' },
]);
</script>
