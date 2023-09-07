<template>
  <h5>{{ addressName }}</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-3">
      <label for="firstname2">House/Block/Lot No.</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-3">
      <label for="lastname2">Street</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="lastname2">Subdivision/Village</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="lastname2">Barangay</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="lastname2">City/Municipality</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="lastname2">Province</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-3">
      <label for="lastname2">Zip Code</label>
      <InputText
        id="lastname2"
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
            v-model="form.address_state"
            input-id="address-state-owned"
            name="address_state"
            value="owned"
          />
          <label
            for="address-state-owned"
            class="ml-2"
            >Owned</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="form.address_state"
            input-id="address-state-rented"
            name="address_state"
            value="rented"
          />
          <label
            for="address-state-rented"
            class="ml-2"
            >Rented/Boarder</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="form.address_state"
            input-id="address-state-living"
            name="address_state"
            value="parents_or_relatives"
          />
          <label
            for="address-state-living"
            class="ml-2"
            >Living with Parents/Relatives</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
import { MemberType } from '@/constants/ui/members';

interface Props {
  type: MemberType;
}

const props = withDefaults(defineProps<Props>(), {
  type: MemberType.PRESENT,
});

const form = reactive<any>({});

const addressName = computed(() => (props.type === MemberType.PRESENT ? 'Present Address' : 'Permanent Address'));
</script>
