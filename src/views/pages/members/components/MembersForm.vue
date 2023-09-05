<template>
  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Surname</label>
      <InputText
        id="firstname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">First Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Middle Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Name Extension (Jr., Sr.)</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Date of Birth</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="field col-12 md:col-6">
      <label for="lastname2">Place of Birth</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="gender">Gender</label>
      <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
          <RadioButton
            v-model="form.gender"
            inputId="gender-maile"
            name="gender"
            value="Male"
          />
          <label
            for="gender-male"
            class="ml-2"
            >Male</label
          >
        </div>
        <div class="flex align-items-center">
          <RadioButton
            v-model="form.gender"
            inputId="gender-female"
            name="gender"
            value="Female"
          />
          <label
            for="gender-female"
            class="ml-2"
            >Female</label
          >
        </div>
      </div>
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Date Hired</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">Department</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label for="lastname2">Position</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Employee No.</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">TIN No.</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label for="lastname2">Email Address</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <MemberAddress :type="MemberType.present" />
  <MemberAddress :type="MemberType.permanent" />

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Telephone Number</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">Mobile Number</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <h5>Name of Spouse</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Surname</label>
      <InputText
        id="firstname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">First Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Middle Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Name Extension (Jr., Sr.)</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Date of Birth</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">Occupation</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label for="lastname2">Contact Number</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <h5>Father's Name</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Surname</label>
      <InputText
        id="firstname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">First Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Middle Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Name Extension (Jr., Sr.)</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Date of Birth</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">Occupation</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label for="lastname2">Contact Number</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <h5>Mother's Name</h5>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Surname</label>
      <InputText
        id="firstname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">First Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Middle Name</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
    <div class="field col-12 md:col-2">
      <label for="lastname2">Name Extension (Jr., Sr.)</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <div class="p-fluid formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Date of Birth</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="lastname2">Occupation</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label for="lastname2">Contact Number</label>
      <InputText
        id="lastname2"
        type="text"
      />
    </div>
  </div>

  <h5 class="flex align-items-center">
    Beneficiaries
    <Button
      icon="pi pi-plus"
      @click="handleAddBeneficiary"
      class="p-button-rounded p-button-success p-button-text"
    />
  </h5>

  <div
    v-for="index in form.beneficiaries.length"
    class="p-fluid formgrid grid"
  >
    <div class="field col-12 md:col-4">
      <label for="lastname2">Name (Last Name, First Name, Middle Name)</label>
      <InputText
        id="lastname2"
        type="text"
        v-model="form.beneficiaries[index - 1].name"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label for="firstname2">Birthdate</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
        v-model="form.beneficiaries[index - 1].birthdate"
      />
    </div>
    <div class="flex align-items-center col-12 md:col-4">
      <div class="field">
        <label for="lastname2">Relationship</label>
        <InputText
          id="lastname2"
          type="text"
          v-model="form.beneficiaries[index - 1].relationship"
        />
      </div>

      <Button
        icon="pi pi-trash"
        @click="handleRemoveBeneficiary(index - 1)"
        class="p-button-rounded p-button-danger p-button-text ml-2"
      />
    </div>
  </div>

  <div class="p-fluid mt-5 formgrid grid">
    <div class="field col-12 md:col-4">
      <label for="firstname2">Application Date</label>
      <Calendar
        pattern="dd-MM-yyyy"
        mask="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import MemberAddress from '@/views/pages/members/components/MemberAddress.vue';
import { reactive } from 'vue';
import { MemberType } from '@/constants/ui/members';
import type { MemberForm } from '@/constants/ui/members';
import useAlert from '@/composables/useAlert';

const { showError } = useAlert();

const form = reactive<MemberForm>({
  beneficiaries: [
    {
      name: '',
      birthdate: undefined,
      relationship: '',
    },
  ],
});

const handleAddBeneficiary = () => {
  form.beneficiaries.push({});
};

const handleRemoveBeneficiary = (index: number) => {
  if (form.beneficiaries.length <= 1) {
    showError('Member must have at least one beneficiary.');
    return;
  }
  form.beneficiaries.splice(index, 1);
};
</script>
