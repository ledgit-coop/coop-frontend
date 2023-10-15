<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Account"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <label for="name">Account Holder</label>
        <Dropdown
          showClear
          :options="accountHolders"
          filter
          v-model="accounHolder"
          option-value="value"
          :loading="loadings.fetch_holders"
          option-label="label"
          placeholder="Select Holder"
          class="w-full"
          validate="account_holder"
          v-validation="validation"
          @filter="handleFilter"
        >
          <template #emptyfilter>
            <Button
              @click="handleAddHolder"
              link
              :label="`Add '${filterHolder}' to the list`"
            />
          </template>
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="account_holder"
        />
      </div>

      <div class="field col-12">
        <label for="name">Type of Account</label>
        <Dropdown
          showClear
          :options="accounts"
          filter
          v-model="accountId"
          option-value="value"
          :loading="loadings.fetch_accounts"
          option-label="label"
          placeholder="Select Type of Account"
          class="w-full"
          validate="account_id"
          v-validation="validation"
          option-disabled="disabled"
        >
        </Dropdown>
        <FieldErrorMessage
          :validation="validation"
          field="account_id"
        />
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
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import type { DropdownOption } from '@/types/ui';
import UtilityService from '@/service/UtilityService';
import useAlert from '@/composables/useAlert';
import MembersService from '@/service/MembersService';
import { AxiosError } from 'axios';
import type { LoanForm } from '@/types/ui/loans';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import { required } from '@vuelidate/validators';

interface Props {
  visible: boolean;
  memberId?: string | number;
}

const loadings = ref({
  add: false,
  fetch_accounts: false,
  fetch_holders: false,
});
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated']);
const model = reactive<LoanForm>({});
const showModal = ref(false);
const accountId = ref();
const accounHolder = ref();
const filterHolder = ref('');
const { showError, showApiError, showSuccess } = useAlert();

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
    if (value) {
      setMemberId();
      loadAccounts();
      loadHolders();
    }
  }
);

watch(
  () => props.memberId,
  () => {
    setMemberId();
  }
);

const accounts = ref<DropdownOption[]>();
const accountHolders = ref<DropdownOption[]>();
const form = computed(() => ({
  account_id: accountId.value,
  account_holder: accounHolder.value,
}));
const { validation } = useValidation({
  rules: {
    account_id: { required },
    account_holder: { required },
  },
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

const handleSaveAccount = async () => {
  if (!props.memberId) {
    showError('Member id not found.');
    return;
  }
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }

  if (loadings.value.add) return;

  loadings.value.add = true;
  try {
    await MembersService.postAddAccount(props.memberId?.toString() ?? '', accountId.value, accounHolder.value);
    showModal.value = false;
    emit('updated');
    showSuccess('Account successfully added.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.add = false;
};
const loadAccounts = async () => {
  loadings.value.fetch_accounts = true;
  try {
    const { data } = await UtilityService.getAccountDropdown({ restrict_member_id: props.memberId?.toString() });
    accounts.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch_accounts = false;
};

const loadHolders = async () => {
  loadings.value.fetch_holders = true;
  try {
    const { data } = await UtilityService.getMemberAccountHoldersDropdown(props?.memberId?.toString() ?? '');
    accountHolders.value = data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch_holders = false;
};
const setMemberId = () => {
  model.member_id = props.memberId?.toString();
};

const handleFilter = (event: any) => {
  filterHolder.value = event.value;
};

const handleAddHolder = () => {
  accountHolders.value?.push({
    value: filterHolder.value,
    label: filterHolder.value,
  });
  accounHolder.value = filterHolder.value;
};
</script>
