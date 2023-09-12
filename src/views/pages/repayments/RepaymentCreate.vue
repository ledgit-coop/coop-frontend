<template>
  <Dialog
    v-model:visible="showModal"
    modal
    header="Add Payment"
    :style="{ width: '40vw' }"
  >
    <div class="grid p-fluid formgrid">
      <div class="field col-12">
        <Label for="name">Due Amount</Label>
        <InputText
          id="lastname2"
          type="text"
          value="1,200.32"
          readonly
        />
      </div>

      <div class="field col-12">
        <Label
          for="name"
          required
          >Amount Paid</Label
        >
        <InputText
          id="lastname2"
          type="text"
        />
      </div>

      <div class="col-12">
        <PageContentHeader
          title="Payment Channels"
          size="h6"
        ></PageContentHeader>
      </div>

      <div class="field col-12 flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="payment_channel"
            input-id="application-type"
            name="loan_type"
            value="payroll"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Payroll</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="payment_channel"
            input-id="application-type"
            name="loan_type"
            value="cash"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Cash</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="payment_channel"
            input-id="application-type"
            name="loan_type"
            value="cheque"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Cheque</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="payment_channel"
            input-id="application-type"
            name="loan_type"
            value="online-transfer"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >Online Transfer</label
          >
        </div>

        <div class="flex align-items-center">
          <RadioButton
            v-model="payment_channel"
            input-id="application-type"
            name="loan_type"
            value="e-wallet"
          />
          <label
            inputId="application-type"
            class="ml-2"
            >E-Wallet</label
          >
        </div>
      </div>

      <div class="p-1"></div>

      <div class="field col-12">
        <Label for="name">Reference # (if applicable)</Label>
        <InputText
          id="lastname2"
          type="text"
          placeholder="Reference Number"
        />
      </div>

      <div class="field col-12">
        <Label for="name">Remarks</Label>
        <InputText
          id="lastname2"
          type="text"
          placeholder="Remarks"
        />
      </div>

      <template v-if="payment_channel === 'payroll'">
        <div class="field col-6">
          <Label
            for="name"
            required
            >Amount Withdrawn from Payroll</Label
          >
          <InputText
            id="lastname2"
            type="text"
            placeholder="Amount"
          />
        </div>
        <div class="field col-6">
          <Label
            for="name"
            required
            >Payroll Remaining Balance</Label
          >
          <InputText
            id="lastname2"
            type="text"
            placeholder="Amount"
          />
        </div>
      </template>
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
      <Button
        label="Save & Print Receipt"
        icon="pi pi-save"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { onMounted, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@/components/PageContentHeader.vue';
import Label from '@/components/Label.vue';
import type { LoanForm } from '@/types/ui/loans';

interface Props {
  visible: boolean;
  memberId?: string;
}

const payment_channel = ref();
const props = defineProps<Props>();
const emit = defineEmits(['update:visible']);
const model = reactive<LoanForm>({});
const showModal = ref(false);

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
</script>
