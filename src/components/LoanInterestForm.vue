<template>
  <div class="grid p-fluid formgrid">
    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Amount</label>
      <InputText
        id="loan_purpose"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_purpose">Loan Purpose</label>
      <InputText
        id="loan_purpose"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_terms">Loan Terms</label>
      <InputText
        id="loan_terms"
       
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="loan_terms">Loan Interest Rate (%)</label>

      <InputNumber
        
        input-id="loan_interest_rate"
        :min-fraction-digits="2"
        :max-fraction-digits="5"
      />

      <small id="username-help">Loan interest can be changed.</small>
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_mode">Payment Mode</label>
      <InputText
        id="payment_mode"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label for="payment_method">Payment Method</label>
      <InputText
        id="payment_method"
        type="text"
      />
    </div>

    
    <div class="field col-12 md:col-6">
      <label for="name">Account</label>
      <Dropdown
        
        filter
        option-value="value"
        option-label="label"
        placeholder="Select Account"
        class="w-full"
       >
      </Dropdown>
      <small
        class="flex align-items-center pt-1"
        id="username-help"
        ><i class="pi pi-info-circle pr-2"></i> Create account if not exists.</small
      >
    </div>
  </div>

</template>

<script setup lang="ts">
</script>