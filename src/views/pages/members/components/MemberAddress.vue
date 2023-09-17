<template>
  <h5>{{ addressName }}</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-3">
      <Label
        required
        for="house-block-lot"
        >House/Block/Lot No.</Label
      >
      <InputText
        id="house-block-lot"
        type="text"
        v-model="data.form.house_block_lot"
        validate="house_block_lot"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="house_block_lot"
      />
    </div>
    <div class="field col-12 md:col-3">
      <Label
        required
        for="street"
        >Street</Label
      >
      <InputText
        id="street"
        type="text"
        v-model="data.form.street"
        validate="street"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="street"
      />
    </div>

    <div class="field col-12 md:col-3">
      <Label
        required
        for="subdivision-village"
        >Subdivision/Village</Label
      >
      <InputText
        id="subdivision-village"
        type="text"
        v-model="data.form.subdivision_village"
        validate="subdivision_village"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="subdivision_village"
      />
    </div>

    <div class="field col-12 md:col-3">
      <Label
        required
        for="barangay"
        >Barangay</Label
      >
      <InputText
        id="barangay"
        v-model="data.form.barangay"
        type="text"
        validate="barangay"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="barangay"
      />
    </div>

    <div class="field col-12 md:col-3">
      <Label
        required
        for="city-municipality"
        >City/Municipality</Label
      >
      <InputText
        id="city-municipality"
        v-model="data.form.city_municipality"
        validate="city_municipality"
        v-validation="validation"
        type="text"
      />
      <FieldErrorMessage
        :validation="validation"
        field="city_municipality"
      />
    </div>

    <div class="field col-12 md:col-3">
      <Label
        required
        for="province"
        >Province</Label
      >
      <InputText
        id="province"
        v-model="data.form.province"
        validate="province"
        v-validation="validation"
        type="text"
      />
      <FieldErrorMessage
        :validation="validation"
        field="province"
      />
    </div>

    <div class="field col-12 md:col-3">
      <Label
        required
        for="zip-code"
        >Zip Code</Label
      >
      <InputNumber
        :minFractionDigits="2"
        :maxFractionDigits="3"
        id="zip-code"
        v-model="data.form.zip_code"
        validate="zip_code"
        v-validation="validation"
      />
      <FieldErrorMessage
        :validation="validation"
        field="zip_code"
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
          <Label
            for="residency-status-owned"
            class="ml-2"
            >Owned</Label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.residency_status"
            input-id="residency-status-rented"
            name="residency_status"
            value="rented"
          />
          <Label
            for="residency-status-rented"
            class="ml-2"
            >Rented/Boarder</Label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="data.form.residency_status"
            input-id="residency-status-living"
            name="residency_status"
            value="parents_or_relatives"
          />
          <Label
            for="residency-status-living"
            class="ml-2"
            >Living with Parents/Relatives</Label
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
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import Label from '@/components/Label.vue';
import InputNumber from 'primevue/inputnumber';

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
  street: { required },
  subdivision_village: { required },
  barangay: { required },
  city_municipality: { required },
  province: { required },
  zip_code: { required },
}));

const { validation } = useValidation({
  rules,
  model: form,
});

onMounted(() => {
  data.form = props.modelValue ?? {};
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
