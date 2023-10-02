<template>
  <div>
    <div class="p-fluid formgrid grid align-items-center">
      <div class="field col-12 md:col-12 lg:col-2">
        <div class="flex gap-2 flex-column ml-auto">
          <Image
            :src="data.form.profile_picture_url ?? '/images/default-user.png'"
            alt="Image"
            height="150"
            class="align-self-center"
            preview
          />

          <Button
            label="Upload photo"
            @click="modals.capture_image = true"
          />
        </div>
      </div>
      <div class="col-12 md:col-12 lg:col-10">
        <div class="p-fluid formgrid grid">
          <div
            v-if="showMemberNumber"
            class="field col-12"
          >
            <Label
              for="surname"
              :required="true"
              >ID Number</Label
            >
            <InputMask
              id="member_number"
              v-model="data.form.member_number"
              mask="99-99999999"
              placeholder="23-00000001"
              validate="member_number"
            />
            <FieldErrorMessage
              :validation="validation"
              field="surname"
            />
          </div>
          <div class="field col-12 md:col-4">
            <Label
              for="surname"
              :required="true"
              >Surname</Label
            >
            <InputText
              id="surname"
              v-model="data.form.surname"
              type="text"
              validate="surname"
              v-validation="validation"
            />
            <FieldErrorMessage
              :validation="validation"
              field="surname"
            />
          </div>
          <div class="field col-12 md:col-4">
            <Label
              for="first-name"
              required
              >First Name</Label
            >
            <InputText
              id="first-name"
              v-model="data.form.first_name"
              type="text"
              validate="first_name"
              v-validation="validation"
            />
            <FieldErrorMessage
              :validation="validation"
              field="first_name"
            />
          </div>
          <div class="field col-12 md:col-2">
            <Label for="middle-name">Middle Name</Label>
            <InputText
              id="middle-name"
              v-model="data.form.middle_name"
              type="text"
            />
          </div>
          <div class="field col-12 md:col-2">
            <label for="lastname2">Name Ext. (Jr., Sr.)</label>
            <InputText
              id="name-ext"
              v-model="data.form.name_extension"
              type="text"
            />
          </div>
        </div>

        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <Label
              for="date-of-birth"
              required
              >Date of Birth</Label
            >
            <Calendar
              showButtonBar
              date-format="yy-mm-dd"
              mask="true"
              id="date-of-birth"
              v-model="data.form.date_of_birth"
              validate="date_of_birth"
              v-validation="validation"
            />
            <FieldErrorMessage
              :validation="validation"
              field="date_of_birth"
            />
          </div>
          <div class="field col-12 md:col-4">
            <Label
              for="place-of-birth"
              required
              >Place of Birth</Label
            >
            <InputText
              id="place-of-birth"
              v-model="data.form.place_of_birth"
              type="text"
            />
            <FieldErrorMessage
              :validation="validation"
              field="place_of_birth"
            />
          </div>

          <div class="field col-12 md:col-2">
            <Label
              required
              for="civil_status"
              >Civil Status</Label
            >

            <Dropdown
              showClear
              v-model="data.form.civil_status"
              :options="civilStatuses"
              filter
              option-value="value"
              option-label="label"
              placeholder="Select Civil Status"
              validate="civil_status"
              v-validation="validation"
              class="w-full"
            >
            </Dropdown>

            <FieldErrorMessage
              :validation="validation"
              field="civil_status"
            />
          </div>

          <div class="field col-12 md:col-2">
            <Label
              required
              for="gender"
              >Gender</Label
            >
            <div class="flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <RadioButton
                  v-model="data.form.gender"
                  input-id="gender-male"
                  name="gender"
                  value="male"
                />
                <label
                  for="gender-male"
                  class="ml-2"
                  >Male</label
                >
              </div>
              <div class="flex align-items-center">
                <RadioButton
                  v-model="data.form.gender"
                  input-id="gender-female"
                  name="gender"
                  value="female"
                />
                <label
                  for="gender-female"
                  class="ml-2"
                  >Female</label
                >
              </div>
            </div>
            <FieldErrorMessage
              :validation="validation"
              field="gender"
            />
          </div>
        </div>

        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="firstname2">Date Hired</label>
            <Calendar
              showButtonBar
              date-format="yy-mm-dd"
              id="date-hired"
              v-model="data.form.date_hired"
              mask="true"
              v-validation="validation"
            />
            <FieldErrorMessage
              :validation="validation"
              field="date_hired"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label for="department">Department</label>
            <InputText
              id="department"
              type="text"
              v-model="data.form.department"
            />
          </div>

          <div class="field col-12 md:col-4">
            <label for="position">Position</label>
            <InputText
              id="position"
              type="text"
              v-model="data.form.position"
            />
          </div>
        </div>

        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="employee-no">Employee No.</label>
            <InputText
              id="employee-no"
              v-model="data.form.employee_no"
              type="text"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label for="tin-no">TIN No.</label>
            <InputText
              id="tin-no"
              v-model="data.form.tin_no"
              type="text"
            />
          </div>

          <div class="field col-12 md:col-4">
            <label for="email-address">Email Address</label>
            <InputText
              id="email-address"
              v-model="data.form.email_address"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>

    <MemberAddress
      @blur="handleSamePresentAddressChange"
      v-model="data.form.present_address"
      :type="MemberType.PRESENT"
    />

    <MemberAddress
      @blur="handleSamePresentAddressChange"
      v-model="data.form.permanent_address"
      :disabled="samePresentAddress"
      :type="MemberType.PERMANENT"
    />
    <div class="flex align-items-center pb-5">
      <Checkbox
        inputId="oriented"
        name="oriented"
        binary
        v-model="samePresentAddress"
        @change="handleSamePresentAddressChange"
      />
      <label
        for="ingredient1"
        class="ml-2"
        >The same with present address</label
      >
    </div>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="telephone-number">Telephone Number</label>
        <InputText
          id="telephone-number"
          type="text"
          v-model="data.form.telephone_number"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="mobile-number">Mobile Number</label>
        <InputText
          id="mobile-number"
          type="text"
          v-model="data.form.mobile_number"
        />
      </div>
    </div>

    <h5>Name of Spouse</h5>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="spouses-surname">Surname</label>
        <InputText
          id="spouses-surname"
          v-model="data.form.spouse.surname"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="spouses-first-name">First Name</label>
        <InputText
          id="spouses-first-name"
          v-model="data.form.spouse.first_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="spouses-middle-name">Middle Name</label>
        <InputText
          id="spouses-middle-name"
          v-model="data.form.spouse.middle_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="spouses-name-extension">Name Extension (Jr., Sr.)</label>
        <InputText
          id="spouses-name-extension"
          v-model="data.form.spouse.name_extension"
          type="text"
        />
      </div>
    </div>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="spouses-date-of-birth">Date of Birth</label>
        <Calendar
          showButtonBar
          id="spouses-date-of-birth"
          v-model="data.form.spouse.date_of_birth"
          date-format="yy-mm-dd"
          mask="true"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="spouses-occupation">Occupation</label>
        <InputText
          id="spouses-occupation"
          v-model="data.form.spouse.occupation"
          type="text"
        />
      </div>

      <div class="field col-12 md:col-4">
        <label for="spouses-contact-number">Contact Number</label>
        <InputText
          id="spouses-contact-number"
          v-model="data.form.spouse.contact_number"
          type="text"
        />
      </div>
    </div>

    <h5>Father's Name</h5>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="fathers-surname">Surname</label>
        <InputText
          id="fathers-surname"
          v-model="data.form.father.surname"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="fathers-first-name">First Name</label>
        <InputText
          id="fathers-first-name"
          v-model="data.form.father.first_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="fathers-middle-name">Middle Name</label>
        <InputText
          id="fathers-middle-name"
          v-model="data.form.father.middle_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="fathers-name-extension">Name Extension (Jr., Sr.)</label>
        <InputText
          id="fathers-name-extension"
          v-model="data.form.father.name_extension"
          type="text"
        />
      </div>
    </div>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="fathers-date-of-birth">Date of Birth</label>
        <Calendar
          showButtonBar
          id="fathers-date-of-birth"
          v-model="data.form.father.date_of_birth"
          date-format="yy-mm-dd"
          mask="true"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="fathers-occupation">Occupation</label>
        <InputText
          id="fathers-occupation"
          v-model="data.form.father.occupation"
          type="text"
        />
      </div>

      <div class="field col-12 md:col-4">
        <label for="fathers-contact-number">Contact Number</label>
        <InputText
          id="fathers-contact-number"
          v-model="data.form.father.contact_number"
          type="text"
        />
      </div>
    </div>

    <h5>Mother's Name</h5>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="mothers-surname">Surname</label>
        <InputText
          id="mothers-surname"
          v-model="data.form.mother.surname"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="mothers-first-name">First Name</label>
        <InputText
          id="mothers-first-name"
          v-model="data.form.mother.first_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="mothers-middle-name">Middle Name</label>
        <InputText
          id="mothers-middle-name"
          v-model="data.form.mother.middle_name"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-2">
        <label for="mothers-name-extension">Name Extension (Jr., Sr.)</label>
        <InputText
          id="mothers-name-extension"
          v-model="data.form.mother.name_extension"
          type="text"
        />
      </div>
    </div>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="mothers-date-of-birth">Date of Birth</label>
        <Calendar
          showButtonBar
          id="mothers-date-of-birth"
          v-model="data.form.mother.date_of_birth"
          date-format="yy-mm-dd"
          mask="true"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="mothers-occupation">Occupation</label>
        <InputText
          id="mothers-occupation"
          v-model="data.form.mother.occupation"
          type="text"
        />
      </div>

      <div class="field col-12 md:col-4">
        <label for="mothers-contact-number">Contact Number</label>
        <InputText
          id="mothers-contact-number"
          v-model="data.form.mother.contact_number"
          type="text"
        />
      </div>
    </div>

    <h5 class="flex align-items-center">
      Beneficiaries
      <Button
        icon="pi pi-plus"
        class="p-button-rounded p-button-success p-button-text"
        @click="handleAddBeneficiary"
      />
    </h5>

    <template
      v-if="data.form.beneficiaries"
      v-for="index in data.form.beneficiaries.length"
      :key="index"
    >
      <MemberBeneficiaryForm
        v-model="data.form.beneficiaries[index - 1]"
        @on-click-remove="handleRemoveBeneficiary(index - 1)"
      />
    </template>

    <h5>In Case of Emergency</h5>

    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="in-case-emergency-person">Name</label>
        <InputText
          id="in-case-emergency-person"
          v-model="data.form.in_case_emergency_person"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="in-case-emergency-address">Address</label>
        <InputText
          id="in-case-emergency-address"
          v-model="data.form.in_case_emergency_address"
          type="text"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label for="in-case-emergency-contact">Contact</label>
        <InputText
          id="in-case-emergency-contact"
          v-model="data.form.in_case_emergency_contact"
          type="text"
        />
      </div>
    </div>

    <div class="p-fluid mt-5 formgrid grid">
      <div class="field col-12 md:col-4">
        <Label
          required
          for="member-at"
          >Application Date</Label
        >
        <Calendar
          showButtonBar
          id="member-at"
          date-format="yy-mm-dd"
          mask="true"
          v-model="data.form.member_at"
          validate="member_at"
          v-validation="validation"
        />
        <FieldErrorMessage
          :validation="validation"
          field="member_at"
        />

        <div class="flex align-items-center pt-3">
          <Checkbox
            inputId="oriented"
            name="oriented"
            binary
            v-model="data.form.oriented"
          />
          <label
            for="ingredient1"
            class="ml-2"
          >
            Done PMES?
          </label>
        </div>
      </div>
    </div>

    <CameraPlugin
      v-model:visible="modals.capture_image"
      @image-taken="handleImageTaken"
    />
  </div>
</template>

<script setup lang="ts">
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import MemberAddress from '@/views/pages/members/components/MemberAddress.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { MemberType } from '@/constants/ui/members';
import type { MemberForm } from '@/types/ui/members';
import useAlert from '@/composables/useAlert';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Label from '@/components/Label.vue';
import FieldErrorMessage from '@/components/FieldErrorMessage.vue';
import { required } from '@vuelidate/validators';
import useValidation from '@/composables/useValidation';
import MemberBeneficiaryForm from '@/views/pages/members/components/MemberBeneficiaryForm.vue';
import Checkbox from 'primevue/checkbox';
import CameraPlugin from '@/components/CameraPlugin.vue';
import Image from 'primevue/image';
import { CivilStatusDropdown } from '@/constants';

interface Props {
  modelValue?: MemberForm;
  showMemberNumber?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'update:validated']);
const { showError } = useAlert();
const samePresentAddress = ref(false);
const rules = computed(() => ({
  surname: { required },
  member_at: { required },
  first_name: { required },
  gender: { required },
  date_of_birth: { required },
  place_of_birth: { required },
}));
const modals = ref({
  capture_image: false,
});
const data = reactive<{ form: MemberForm }>({
  form: {
    father: {},
    mother: {},
    spouse: {},
    beneficiaries: [{}],
  },
});
const civilStatuses = computed(() => CivilStatusDropdown);

const form = computed(() => data.form);

const { validation } = useValidation({
  rules,
  model: form,
  globalConfig: {
    $autoDirty: true,
  },
});

onMounted(() => {
  if (props.modelValue) data.form = props.modelValue;
});

watch(
  () => data.form,
  (value: MemberForm) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value?: MemberForm) => {
    if (value) data.form = value;
  }
);

const handleAddBeneficiary = () => {
  if (data.form.beneficiaries) data.form.beneficiaries.push({});
};

const handleRemoveBeneficiary = (index: number) => {
  if (data.form.beneficiaries) {
    if (data.form.beneficiaries.length <= 1) {
      showError('Member must have at least one beneficiary.');
      return;
    }
    data.form.beneficiaries.splice(index, 1);
  }
};

const handleImageTaken = (value: any) => {
  data.form.profile_picture_url = value.image_data_url;
};

const handleSamePresentAddressChange = () => {
  setTimeout(() => {
    if (samePresentAddress.value)
      data.form.permanent_address = {
        ...data.form.present_address,
      };
  }, 1000);
};
</script>
