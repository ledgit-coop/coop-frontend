<template>
  <Dialog
    @hide="handleHide"
    v-model:visible="showModal"
    modal
    header="Generate Net Surplus"
    :style="{ width: '30vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label
          for="from-date"
          required
          help-text="Beginning of Fiscal Year is simply the start date of a coop's financial year. It marks when their financial reporting period begins."
          >Beginning of Fiscal Year</Label
        >

        <Calendar
          date-format="yy-mm-dd"
          id="from-date"
          v-model="data.form.from_date"
          mask="true"
          validate="from_date"
          v-validation="validation"
          showButtonBar
        />
        <FieldErrorMessage
          :validation="validation"
          field="from_date"
        />
      </div>

      <div class="field col-12">
        <Label
          required
          for="to-date"
          help-text="Ending of Fiscal Year is the conclusion or end date of a coop's financial year. It signifies the conclusion of the financial reporting period and is often used for financial statements, audits, and planning for the upcoming fiscal year."
          >Ending of Fiscal Year</Label
        >

        <Calendar
          date-format="yy-mm-dd"
          id="to-date"
          v-model="data.form.to_date"
          mask="true"
          validate="to_date"
          v-validation="validation"
          showButtonBar
        />
        <FieldErrorMessage
          :validation="validation"
          field="to_date"
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
        label="Generate"
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
import Label from '@/components/Label.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import useValidation from '@/composables/useValidation';
import { required } from '@vuelidate/validators';

import type { NetSurplusPayload } from '@/types/api/net-surplus';
import type { NetSurplusSaveForm } from '@/types/ui/net-surplus';
import NetSurplusService from '@/service/NetSurplusService';
import moment from 'moment';
import { DATE_FORMAT_DB } from '@/constants';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'updated', 'hide']);
const showModal = ref(false);
const { showApiError, showError, showSuccess } = useAlert();
const data = reactive<{ form: NetSurplusSaveForm }>({
  form: {},
});
const loadings = ref({
  save: false,
  fetch: false,
});

const form = computed(() => data.form);

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
  }
);

const handleSave = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) {
    showError('Please complete the required fields.');
    return;
  }
  loadings.value.save = true;
  try {
    const payload: NetSurplusPayload = {
      from_date: moment(form.value.from_date).format(DATE_FORMAT_DB),
      to_date: moment(form.value.to_date).format(DATE_FORMAT_DB),
    };

    await NetSurplusService.store(payload);
    emit('updated');
    showModal.value = false;
    showSuccess('Net surplus successfully generated.');
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
