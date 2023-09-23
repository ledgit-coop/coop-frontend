<template>
  <Dialog
    @hide="handleHide"
    v-model:visible="showModal"
    modal
    :header="props.accountId ? 'Edit Account' : 'Add Account'"
    :style="{ width: '30vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label
          for="name"
          required
          >Name</Label
        >
        <InputText
          v-model="data.form.name"
          id="name"
          :loading="loadings.fetch"
          type="text"
        />
        <FieldErrorMessage
          :validation="validation"
          field="name"
        />
      </div>

      <div class="field col-12">
        <Label
          required
          for="type"
          >Type</Label
        >
        <Dropdown
          showClear
          id="type"
          :options="types"
          optionLabel="label"
          option-value="value"
          v-model="data.form.type"
          option-disabled="disabled"
          placeholder="Account Type"
          class="w-full"
          validate="type"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="type"
        />
      </div>

      <div class="field col-12">
        <Label for="earn-interest-per-anum">Interest Per Anum</Label>
        <InputNumber
          v-model="data.form.earn_interest_per_anum"
          id="earn-interest-per-anum"
          :loading="loadings.fetch"
          :minFractionDigits="2"
          :maxFractionDigits="3"
          show-buttons
        />
        <FieldErrorMessage
          :validation="validation"
          field="earn_interest_per_anum"
        />
      </div>

      <div class="field col-12">
        <Label for="maintaining-balance">Maintaining Balance</Label>
        <InputNumber
          v-model="data.form.maintaining_balance"
          id="maintaining-balance"
          :loading="loadings.fetch"
          :minFractionDigits="2"
          :maxFractionDigits="3"
          show-buttons
        />
        <FieldErrorMessage
          :validation="validation"
          field="maintaining_balance"
        />
      </div>

      <div class="field col-12 lg:col-6">
        <label for="penalty-below-maintaining-cycle">Penalty Cycle</label>
        <Dropdown
          showClear
          id="penalty-below-maintaining-cycle"
          :options="penalty_cycle"
          optionLabel="label"
          option-value="value"
          v-model="data.form.penalty_below_maintaining_cycle"
          option-disabled="disabled"
          placeholder="Select a Duration Period"
          class="w-full"
          validate="penalty_below_maintaining_cycle"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="penalty_below_maintaining_cycle"
        />
      </div>

      <div class="field col-12 lg:col-6">
        <label for="penalty-below-maintaining-duration">Duration</label>
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          showButtons
          id="penalty-below-maintaining-duration"
          v-model="data.form.penalty_below_maintaining_duration"
          placeholder="Penalty Duration"
          type="text"
          validate="penalty_below_maintaining_duration"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="penalty_below_maintaining_duration"
        />
      </div>

      <div class="field col-12 lg:col-6">
        <label for="penalty-below-maintaining-method">Penalty Method</label>
        <Dropdown
          showClear
          id="penalty-below-maintaining-method"
          :options="penalty_method"
          optionLabel="label"
          option-value="value"
          v-model="data.form.penalty_below_maintaining_method"
          option-disabled="disabled"
          placeholder="Select a Method"
          class="w-full"
          validate="penalty_below_maintaining_method"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="penalty_below_maintaining_method"
        />
      </div>

      <div class="field col-12 lg:col-6">
        <label for="penalty-below-maintaining">Penalty</label>
        <InputNumber
          :minFractionDigits="2"
          :maxFractionDigits="3"
          showButtons
          id="penalty-below-maintaining"
          v-model="data.form.penalty_below_maintaining"
          placeholder="Penalty"
          type="text"
          validate="penalty_below_maintaining"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="penalty_below_maintaining"
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
        @click="handleSave"
        :loading="loadings.save || loadings.fetch"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';
import type { AccountSaveForm } from '@/types/ui/accounts';
import {
  AccountMaintainingBalancePenaltyCycle,
  AccountMaintainingBalancePenaltyMethod,
  AccountType,
} from '@/constants/ui/accounts';

import InputNumber from 'primevue/inputnumber';
import AccountsService from '@/service/AccountsService';
import type { DropdownOption } from '@/types/ui';
import Dropdown from 'primevue/dropdown';
import { createSlug } from '@/helpers';
import type { AccountSavePayload } from '@/types/api/accounts';

interface Props {
  visible: boolean;
  accountId?: number | string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const { showApiError, showError, showSuccess } = useAlert();
const data = reactive<{ form: AccountSaveForm }>({
  form: {},
});
const loadings = ref({
  save: false,
  fetch: false,
});
const isEditing = ref(false);
const form = computed(() => data.form);

const penalty_cycle = ref<DropdownOption[]>([
  { label: 'Day', value: AccountMaintainingBalancePenaltyCycle.DAY },
  { label: 'Month', value: AccountMaintainingBalancePenaltyCycle.MONTH },
  { label: 'Quarter', value: AccountMaintainingBalancePenaltyCycle.QUARTER },
  { label: 'Year', value: AccountMaintainingBalancePenaltyCycle.YEAR },
]);

const types = ref<DropdownOption[]>([
  { label: 'Regular', value: AccountType.REGULAR },
  { label: 'Savings', value: AccountType.SAVINGS },
  { label: 'Share Capital', value: AccountType.SHARE_CAPITAL },
]);

const penalty_method = ref<DropdownOption[]>([
  { label: 'Fixed', value: AccountMaintainingBalancePenaltyMethod.FIXED },
  { label: 'Percentage', value: AccountMaintainingBalancePenaltyMethod.PERCENTAGE },
]);

const { validation } = useValidation({
  rules: {
    name: { required },
    type: { required },
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
  if (!showModal) isEditing.value = false;
});

watch(
  () => props.visible,
  (value) => {
    showModal.value = value ?? false;
  }
);

watch(
  () => props.accountId,
  (value) => {
    if (value) {
      loadAccount();
      isEditing.value = true;
    }
  }
);

const loadAccount = async () => {
  loadings.value.fetch = true;
  try {
    const { data: account } = await AccountsService.show(Number(props.accountId ?? 0));
    // @ts-ignore
    data.form = {
      ...(account ?? {}),
    };
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.fetch = false;
};

const handleSave = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  loadings.value.save = true;
  try {
    const payload: AccountSavePayload = {
      ...(data.form ?? {}),
      key: createSlug(data.form.name ?? ''),
    };

    if (isEditing.value) await AccountsService.update(Number(props.accountId ?? 0), payload);
    else await AccountsService.store(payload);
    emit('updated');
    showModal.value = false;
    showSuccess('Account successfully saved.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.save = false;
};

const handleHide = () => {
  emit('hide');
  data.form = {};
  validation.value?.$reset();
};
</script>
