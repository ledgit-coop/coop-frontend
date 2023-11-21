<template>
  <div class="grid md:col-6">
    <Panel
      toggleable
      class="col-12 pb-0"
      header="General Settings"
    >
      <div class="grid p-fluid formgrid">
        <div
          v-for="(value, index) in generalSettings"
          :key="index"
          class="field col-12"
        >
          <Label
            :for="value.key"
            :helper-text="value.helper"
            >{{ value.name }}</Label
          >
          <InputText
            :id="value.key"
            v-model="generalSettings[index].value"
            type="text"
          />
        </div>
      </div>
      <div class="flex">
        <Button
          class="ml-auto"
          label="Save"
          :loading="loadings.save_general"
          @click="handleSaveGeneralSettings"
          icon="pi pi-save"
        />
      </div>
    </Panel>

    <Panel
      toggleable
      class="col-12 pb-0"
      header="Net Surplus"
    >
      <div class="grid p-fluid formgrid">
        <div
          v-for="(value, index) in netSurplusSettings"
          :key="index"
          class="field col-12"
        >
          <Label
            :for="value.key"
            :helper-text="value.helper"
            >{{ value.name }}</Label
          >
          <InputText
            :id="value.key"
            v-model="netSurplusSettings[index].value"
            type="text"
          />
        </div>
      </div>

      <div class="flex">
        <Button
          class="ml-auto"
          label="Save"
          :loading="loadings.save_net_surplus"
          icon="pi pi-save"
          @click="handleSaveNetSurplus"
        />
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import { onMounted, ref } from 'vue';
import { GENERAL_SETTINGS, REVENUE_SETTINGS } from '@/constants/ui/settings';
import SettingsService from '@/service/SettingsService';
import type { SettingOption, Settings } from '@/types/ui/settings';
import { deepClone } from '@/helpers';
import useAlert from '@/composables/useAlert';
import Button from 'primevue/button';
import type { AxiosError } from 'axios';

const netSurplusSettings = ref(REVENUE_SETTINGS);
const generalSettings = ref(GENERAL_SETTINGS);
const { showApiError, showSuccess } = useAlert();
const loadings = ref({
  save_net_surplus: false,
  save_general: false,
});
onMounted(() => {
  loadSettings();
});

const loadSettings = () => {
  SettingsService.list()
    .then((r) => {
      netSurplusSettings.value = setSettings(r.data, netSurplusSettings.value);
      generalSettings.value = setSettings(r.data, generalSettings.value);
    })
    .catch((error) => showApiError(error));
};

const handleSaveGeneralSettings = async () => {
  if (!loadings.value.save_general) {
    loadings.value.save_general = true;
    await saveSettings(generalSettings.value);
    loadings.value.save_general = false;
  }
};

const handleSaveNetSurplus = async () => {
  if (!loadings.value.save_net_surplus) {
    loadings.value.save_net_surplus = true;
    await saveSettings(netSurplusSettings.value);
    loadings.value.save_net_surplus = false;
  }
};

const saveSettings = async (form: SettingOption[]) => {
  try {
    await SettingsService.store(
      form.map((r) => ({
        key: r.key,
        name: r.name,
        value: r.value,
      }))
    );
    showSuccess('Settings saved.');
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const setSettings = (settings: Settings[], form: SettingOption[]): SettingOption[] => {
  for (let index = 0; index < form.length; index++) {
    const st = settings.find((e) => e.key === form[index].key);
    if (st) {
      form[index].value = st.value;
      form[index].name = st.name;
      form[index].key = st.key;
    }
  }
  return deepClone<SettingOption[]>(form);
};
</script>
