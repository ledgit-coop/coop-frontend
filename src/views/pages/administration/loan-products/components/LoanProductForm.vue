<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12">
      <Label
        for="name"
        required
        >Product Name</Label
      >
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="col-12">
      <PageContentHeader
        title="Disbursement Channels"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12">
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
        title="Loanable Amounts"
        size="h6"
      ></PageContentHeader>
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Minimum</label>
      <InputNumber
        showButtons
        id="lastname2"
        placeholder="Min"
        type="text"
      />
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Default</label>
      <InputNumber
        showButtons
        id="lastname2"
        placeholder="Default"
        type="text"
      />
    </div>

    <div class="field col-12 lg:col-4">
      <label for="name">Maximum</label>
      <InputNumber
        showButtons
        id="lastname2"
        placeholder="Max"
        type="text"
      />
    </div>

    <div class="field col-12">
      <label for="name">Required Share Capital</label>
      <span class="p-input-icon-right">
        <i class="pi pi-percentage" />
        <InputText placeholder="Percentage" />
      </span>
    </div>

    <LoanTerm />

    <LoanFeeForm />
  </div>
</template>
<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import PageContentHeader from '@/components/PageContentHeader.vue';
import LoanTerm from '@/components/LoanTerm.vue';
import Label from '@/components/Label.vue';
import LoanFeeForm from '@/components/LoanFeeForm.vue';
</script>
