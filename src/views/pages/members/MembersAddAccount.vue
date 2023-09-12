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
          v-model="accountId"
          option-value="value"
          :loading="loadings.fetch_accounts"
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
        @click="handleSaveAccount"
        :loading="loadings.add"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import MembersService from '@/service/MembersService';
import { AxiosError } from 'axios';
import type { LoanForm } from '@/types/ui/loans';

interface Props {
  visible: boolean;
  memberId?: string | number;
}

const loadings = ref({
  add: false,
  fetch_accounts: false,
});
const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<LoanForm>({});
const showModal = ref(false);
const accountId = ref();
const { showError, showApiError, showSuccess } = useAlert();

onMounted(() => {
  setMemberId();
  loadAccounts();
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

const accounts = ref<DropdownOption[]>();

const handleSaveAccount = async () => {
  if (!props.memberId) showError('Member id not found.');
  if (loadings.value.add) return;
  loadings.value.add = true;
  try {
    await MembersService.postAddAccount(props.memberId?.toString() ?? '', accountId.value);
    showModal.value = false;
    showSuccess('Account successfully added.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.add = false;
};
const loadAccounts = async () => {
  loadings.value.fetch_accounts = true;
  const { data } = await UtilityService.getAccountDropdown();
  accounts.value = data;
  loadings.value.fetch_accounts = false;
};

const setMemberId = () => {
  model.member_id = props.memberId?.toString();
};
</script>
