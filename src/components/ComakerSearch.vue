<template>
  <AutoComplete
    v-model="comaker"
    :suggestions="filteredItems"
    :virtual-scroller-options="{ itemSize: 38 }"
    option-label="name"
    dropdown
    @complete="searchItems"
  >
    <template #option="slotProps">
      <div class="flex flex-column">
        <div
          v-if="slotProps.option.comakered_twice"
          class="text-red-500"
        >
          {{ slotProps.option.name }}
        </div>
        <span v-else>{{ slotProps.option.name }}</span>
      </div>
    </template>
  </AutoComplete>
</template>
<script setup lang="ts">
import UtilityService from '@/service/UtilityService';
import { onMounted, ref, watch } from 'vue';

interface Props {
  modelValue?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const filteredItems = ref<any[]>([]);
const comakers = ref<any[]>([]);
const comaker = ref<string>();

onMounted(() => {});

watch(
  () => comaker.value,
  () => {
    emit('update:modelValue', comaker.value);
  }
);

watch(
  () => props.modelValue,
  () => {
    comaker.value = props.modelValue ?? '';
  }
);

onMounted(() => {
  comaker.value = props.modelValue ?? '';
  loadComakers();
});

const loadComakers = async () => {
  var { data: list } = await UtilityService.getCoMakers({});
  comakers.value = list;
};

const searchItems = (event: any) => {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let query = event.query;
  console.log(query);
  let _filteredItems = [];

  for (let i = 0; i < comakers.value.length; i++) {
    let item = comakers.value[i];

    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
      _filteredItems.push(item);
    }
  }

  filteredItems.value = _filteredItems;
};
</script>
