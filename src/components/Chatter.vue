<template>
  <div class="flex flex-column">
    <div class="field">
      <Textarea
        rows="5"
        cols="30"
        class="w-full"
        ref="commentInput"
        :loading="loadings.save"
        v-model="comment"
      />
      <FieldErrorMessage
        :validation="validation"
        field="comment"
      />
    </div>

    <div class="flex">
      <div class="ml-auto">
        <Button
          label="Cancel"
          icon="pi pi-times"
          text
          v-if="isEditing"
          @click="handleCancelEditClick"
        />

        <Button
          :label="isEditing ? 'Update' : 'Comment'"
          :severity="isEditing ? 'warning' : 'primary'"
          :loading="loadings.save"
          @click="makeComment"
        />
      </div>
    </div>
  </div>

  <div
    v-if="!loadings.list"
    class="p-grid pt-5"
  >
    <div
      v-for="(log, index) in logs"
      class="p-col-12 p-md-4 p-lg-3 pb-3"
      :key="index"
    >
      <div class="p-card p-1">
        <div class="p-card-header flex align-items-center gap-2">
          <span>{{ log.user?.name }}</span>
          <small class="comment-date">{{ dateFormat(log.created_at, DATE_TIME_FORMAT) }}</small>
          <div class="ml-auto">
            <Button
              icon="pi pi-trash"
              @click="handleDeleteClick(log)"
              severity="danger"
              text
              rounded
              aria-label="Delete"
              v-tooltip="'Delete'"
            />
            <Button
              icon="pi pi-pencil"
              severity="warning"
              @click="handleEditClick(log)"
              text
              rounded
              aria-label="Edit"
              v-tooltip="'Edit'"
            />
          </div>
        </div>
        <div class="p-card-body">
          {{ log.content }}
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex flex-column gap-2 pt-5"
  >
    <Skeleton
      class="w-full"
      style="height: 50px"
    />
    <Skeleton
      class="w-full"
      style="height: 50px"
    />
    <Skeleton
      class="w-full"
      style="height: 50px"
    />
    <Skeleton
      class="w-full"
      style="height: 50px"
    />
    <Skeleton
      class="w-full"
      style="height: 50px"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import { LogModules, LogTypes } from '@/constants/ui/logs';
import LogService from '@/service/LogService';
import { computed, onMounted, ref } from 'vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import FieldErrorMessage from './FieldErrorMessage.vue';
import type { Log } from '@/types/ui/logs';
import { dateFormat } from '@/helpers';
import { DATE_TIME_FORMAT } from '@/constants';
import { useConfirm } from 'primevue/useconfirm';

interface Props {
  globalHistory?: boolean;
  module: LogModules;
  moduleId?: string | number;

  parentModule?: LogModules;
  parentModuleId?: string | number;
}
const commentInput = ref();
const comment = ref<string | undefined>();
const props = defineProps<Props>();
const selectedLog = ref<Log | undefined>();
const isEditing = computed(() => !!selectedLog.value);
const loadings = ref({
  save: false,
  list: false,
  delete: false,
});
const logs = ref<Log[]>([]);

const form = computed(() => ({
  comment: comment.value,
}));

const rules = computed(() => ({
  comment: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
});
const confirm = useConfirm();

const { showApiError } = useAlert();

onMounted(() => {
  loadings.value.list = true;
  list();
});

const list = async () => {
  try {
    const { data } = await LogService.index({
      module: props.module,
      module_id: props.moduleId?.toString() ?? '',
    });

    logs.value = data.data;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.list = false;
};

const handleEditClick = (log: Log) => {
  selectedLog.value = log;
  comment.value = log.content;
  // @ts-ignore
  if (commentInput.value) commentInput.value.$el.focus();
};

const handleDeleteClick = async (log: Log) => {
  try {
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Delete Comment',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-primary',
      accept: async () => {
        if (!loadings.value.delete) {
          try {
            loadings.value.delete = true;
            await LogService.delete(log.id.toString());
            list();
          } catch (error) {
            showApiError(error as AxiosError);
          }
          loadings.value.delete = false;
        }
      },
    });
  } catch (error) {
    showApiError(error as AxiosError);
  }
};

const handleCancelEditClick = () => {
  selectedLog.value = undefined;
  comment.value = undefined;
  validation.value?.$reset();
};
const makeComment = async () => {
  await validation.value?.$validate();
  if (validation.value?.$invalid) return;
  if (!loadings.value.save) {
    try {
      loadings.value.save = true;
      if (isEditing.value)
        await LogService.patch(selectedLog.value?.id.toString() ?? '', {
          module: props.module,
          module_id: props.moduleId?.toString() ?? '',
          type: LogTypes.COMMENT,
          content: comment.value?.toString() ?? '',
          parent_module: props.parentModule?.toString() ?? '',
          parent_module_id: props.parentModuleId?.toString() ?? '',
        });
      else
        await LogService.post({
          module: props.module,
          module_id: props.moduleId?.toString() ?? '',
          type: LogTypes.COMMENT,
          content: comment.value?.toString() ?? '',
          parent_module: props.parentModule?.toString() ?? '',
          parent_module_id: props.parentModuleId?.toString() ?? '',
        });

      comment.value = undefined;
      validation.value?.$reset();
      list();
    } catch (error) {
      showApiError(error as AxiosError);
    }
    selectedLog.value = undefined;
    loadings.value.save = false;
  }
};
</script>
