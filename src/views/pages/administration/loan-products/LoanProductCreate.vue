<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Account"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <label for="name">Product Name</label>
        <InputText
          id="lastname2"
          type="text"
        />
      </div>

      <div class="field col-12">
        <label for="name">Disbursement Channel</label>

        <div class="flex align-items-center p-1">
          <Checkbox
            inputId="ingredient1"
            name="pizza"
            value="Cheese"
          />
          <label
            for="ingredient1"
            class="ml-2"
          >
            Cash
          </label>
        </div>
        <div class="flex align-items-center p-1">
          <Checkbox
            inputId="ingredient2"
            name="pizza"
            value="Mushroom"
          />
          <label
            for="ingredient2"
            class="ml-2"
          >
            Cheque
          </label>
        </div>
        <div class="flex align-items-center p-1">
          <Checkbox
            inputId="ingredient3"
            name="pizza"
            value="Pepper"
          />
          <label
            for="ingredient3"
            class="ml-2"
          >
            Online Transfer
          </label>
        </div>
        <div class="flex align-items-center p-1">
          <Checkbox
            inputId="ingredient4"
            name="pizza"
            value="Onion"
          />
          <label
            for="ingredient4"
            class="ml-2"
          >
            E-Wallet
          </label>
        </div>
      </div>

      <div class="col-12">
        <PageContentHeader
          title="Principal Amounts"
          size="h6"
        ></PageContentHeader>
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Minimum</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Default</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Maximum</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>

      <div class="col-12">
        <PageContentHeader
          title="Interest"
          size="h6"
        ></PageContentHeader>
      </div>

      <div class="field col-12">
        <label for="name">Interest Method</label>
        <Dropdown
          :options="interest_methods"
          optionLabel="label"
          placeholder="Select a Method"
          class="w-full"
        />
      </div>

      <div class="field col-12">
        <label for="name">Interest Type</label>
        <div class="flex flex-wrap gap-3">
          <div class="flex align-items-center">
            <RadioButton
              input-id="application-type"
              name="loan_type"
              value="new"
            />
            <label
              inputId="application-type"
              class="ml-2"
              >Percentage Base %</label
            >
          </div>
          <div class="flex align-items-center">
            <RadioButton
              input-id="application-type"
              name="loan_type"
              value="renew"
            />
            <label
              inputId="application-type"
              class="ml-2"
              >Fixed Amount</label
            >
          </div>
        </div>
      </div>

      <div class="field col-12">
        <label for="name">Interest Period</label>
        <Dropdown
          :options="interest_periods"
          optionLabel="label"
          placeholder="Select a Period"
          class="w-full"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Min Interest</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Default Interest</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>

      <div class="field col-12 lg:col-4">
        <label for="name">Max Interest</label>
        <InputNumber
          id="lastname2"
          type="text"
        />
      </div>





      <div class="col-12">
        <PageContentHeader
          title="Payment"
          size="h6"
        ></PageContentHeader>
      </div>

      <div class="field col-12">
        <label for="name">Duration Period</label>
        <Dropdown
          :options="duration_period"
          optionLabel="label"
          placeholder="Select a Method"
          class="w-full"
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
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import type { MemberLoanApplication } from '@/types/ui/members';
import Button from 'primevue/button';
import type { DropdownOption } from '@/types/ui';
import InputText from 'primevue/inputtext';
import type InputNumber from 'primevue/inputnumber';
import PageContentHeader from '@/components/PageContentHeader.vue';

interface Props {
  visible: boolean;
  memberId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<MemberLoanApplication>({});
const showModal = ref(false);

const interest_methods = ref<DropdownOption[]>([
  { label: 'Flat Rate', value: 'NY' },
  { label: 'Diminishing Balance (Installments)', value: 'RM' },
  { label: 'Diminishing Balance (Principal)', value: 'RM' },
]);

const duration_period = ref<DropdownOption[]>([
  { label: 'Days', value: 'NY' },
  { label: 'Weeks', value: 'RM' },
  { label: 'Months', value: 'RM' },
  { label: 'Year', value: 'RM' },
]);

const interest_periods = ref<DropdownOption[]>([
  { label: 'Daily', value: 'NY' },
  { label: 'Weekly', value: 'RM' },
  { label: 'Monthly', value: 'RM' },
  { label: 'Yearly', value: 'RM' },
  { label: 'By Loan', value: 'RM' },
]);

onMounted(() => {
  setMemberId();
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

const setMemberId = () => {
  model.member_id = props.memberId;
};

const accounts = ref<DropdownOption[]>([
  { value: '1', label: 'Regular Loan Account' },
  { value: '2', label: 'Educational Loan Account' },
  { value: '3', label: 'Share Capital Account' },
  { value: '4', label: 'Savings Account' },
  { value: '5', label: 'Kiddie Savings Account' },
]);
</script>
