<template>
  <h5>{{ addressName }}</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-3">
      <label for="house-block-lot">House/Block/Lot No.</label>
      <InputText
        id="house-block-lot"
        type="text"
        v-model="data.form.house_block_lot"
      />
    </div>
    <div class="field col-12 md:col-3">
      <label for="street">Street</label>
      <InputText
        id="street"
        type="text"
        v-model="data.form.street"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="subdivision-village">Subdivision/Village</label>
      <InputText
        id="subdivision-village"
        type="text"
        v-model="data.form.subdivision_village"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="barangay">Barangay</label>
      <InputText
        id="barangay"
        v-model="data.form.barangay"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="city-municipality">City/Municipality</label>
      <InputText
        id="city-municipality"
        v-model="data.form.city_municipality"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="province">Province</label>
      <InputText
        id="province"
        v-model="data.form.province"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="zip-code">Zip Code</label>
      <InputText
        id="zip-code"
        v-model="data.form.zip_code"
        type="text"
      />
    </div>
  </div>

  <div
    v-if="type == MemberType.PRESENT"
    class="p-fluid formgrid grid"
  >
    <div class="field col-12">
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.residency_status"
            input-id="residency-status-owned"
            name="residency_status"
            value="owned"
          />
          <label
            for="residency-status-owned"
            class="ml-2"
            >Owned</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.residency_status"
            input-id="residency-status-rented"
            name="residency_status"
            value="rented"
          />
          <label
            for="residency-status-rented"
            class="ml-2"
            >Rented/Boarder</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.residency_status"
            input-id="residency-status-living"
            name="residency_status"
            value="parents_or_relatives"
          />
          <label
            for="residency-status-living"
            class="ml-2"
            >Living with Parents/Relatives</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { MemberType } from '@/constants/ui/members';
import type { MemberAddress } from '@/types/ui/members';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';

interface Props {
  type: MemberType;
  modelValue?: MemberAddress;
}

const props = withDefaults(defineProps<Props>(), {
  type: MemberType.PRESENT,
});

const emit = defineEmits(['update:modelValue']);

const data = reactive<{ form: MemberAddress }>({
  form: {},
});

const form = computed(() => data.form);

const addressName = computed(() => (props.type === MemberType.PRESENT ? 'Present Address' : 'Permanent Address'));

const rules = computed(() => ({
  house_block_lot: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
});

onMounted(() => {
  data.form = props.modelValue ?? {};
  console.log(validation);
});

watch(
  () => data.form,
  (value: MemberAddress) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value?: MemberAddress) => {
    data.form = value ?? {};
  }
);
</script>
