<template>
  <div class="grid">
    <div class="col-12">
      <InlineMessage
        v-if="member && !member?.oriented"
        severity="error"
        >Not attended membership orientation.</InlineMessage
      >
      <InlineMessage
        v-if="member && member?.oriented"
        severity="success"
        class="mt-2"
        >Attended orientation.</InlineMessage
      >
      <div class="card">
        <div class="grid m-0 align-items-center">
          <Avatar
            label="P"
            class="mr-2"
            size="xlarge"
            shape="circle"
          ></Avatar>
          <div class="flex flex-column ml-2">
            <Skeleton
              v-if="loadings.member_fetch"
              width="10rem"
              class="mb-2"
            ></Skeleton>
            <h4
              v-else
              class="m-0"
            >
              {{ member?.full_name }}
            </h4>
            <small>Member since: {{ member?.member_year }}</small>
          </div>

          <div
            v-if="member"
            class="ml-auto mt-5 md:mt-0 lg:mt-0 grid gap-2"
          >
            <Button
              icon="pi pi-arrow-left"
              label="Back"
              @click="router.push({ name: ROUTE_NAME_MEMBERS })"
            ></Button>
            <Button
              icon="pi pi-print"
              label="Print"
            ></Button>


            <Button
              icon="pi pi-pencil"
              label="Edit"
            ></Button>

            <Button
              icon="pi pi-print"
              label="Apply Loan"
              @click="handleApplyLoanClick"
            ></Button>

            <Button
              icon="pi pi-plus"
              label="Add Account"
              @click="modalsVisibility.add_account = true"
            ></Button>

            <Button
              icon="pi pi-check"
              label="Attended Orientation"
              v-if="!member.oriented"
              @click="handleDoneOrientation"
            ></Button>

            <Button
              icon="pi pi-plus"
              label="Add Transaction"
              @click="modalsVisibility.make_transaction = true"
            ></Button>
            <Button
              icon="pi pi-print"
              label="Terminate"
              severity="danger"
              @click="handleTerminateClick"
            ></Button>
          </div>
        </div>

        <div class="mt-3">
          <TabView scrollable>
            <TabPanel header="Member Information">
              <div class="p-3">
                <div class="grid mt-2">
                  <div class="col-12 p-0">
                    <h6>Member Information</h6>
                  </div>

                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="basic_information"
                    />
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="employment_information"
                    />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Addresses</h6>
                  </div>
                  <div class="col-12 p-0">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="address_info"
                    />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Spouse</h6>
                  </div>
                  <div class="col-12 p-0">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="spouse_information"
                    />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Parents Information</h6>
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="father_information"
                    />
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information
                      :loading="loadings.member_fetch"
                      :info="mother_information"
                    />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Beneficiaries</h6>
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <div class="p-datatable-wrapper">
                      <table class="p-datatable-table">
                        <thead class="p-datatable-thead">
                          <tr>
                            <th>Name</th>
                            <th>Birthdate</th>
                            <th>Relationship</th>
                          </tr>
                        </thead>
                        <tbody class="p-datatable-tbody">
                          <tr>
                            <td>Kevin</td>
                            <td>Sept 2, 1993</td>
                            <td>Mother</td>
                          </tr>
                          <tr>
                            <td>Kevin</td>
                            <td>Sept 2, 1993</td>
                            <td>Mother</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Share Capital">
              <MembersShareCapital />
            </TabPanel>
            <TabPanel header="Savings">
              <MembersSavings />
            </TabPanel>
            <TabPanel header="Loans">
              <MembersLoans />
            </TabPanel>
            <TabPanel header="Accounts">
              <MembersAccounts />
            </TabPanel>

            <TabPanel header="Logs">
              <MembersLogs />
            </TabPanel>
          </TabView>
          <ApplyLoan
            v-model:visible="modalsVisibility.apply_form"
            :member="member"
            :disable-member="true"
          />
          <MakeAccountTransaction
            v-model:visible="modalsVisibility.make_transaction"
            :member-id="member?.id"
          />
          <MembersAddAccount
            v-model:visible="modalsVisibility.add_account"
            :member-id="member?.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Avatar from 'primevue/avatar';
import Information from '@components/Information.vue';
import type { InformationItem } from '@/types/ui';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import router from '@/router';
import MembersShareCapital from './components/MembersShareCapital.vue';
import MembersLoans from './components/MembersLoans.vue';
import ApplyLoan from '@components/ApplyLoan.vue';
import { ROUTE_NAME_MEMBERS } from '@/constants';
import MembersSavings from './components/MembersSavings.vue';
import MembersAccounts from './components/MembersAccounts.vue';
import MakeAccountTransaction from '@components/MakeAccountTransaction.vue';
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/button';
import MembersAddAccount from './MembersAddAccount.vue';
import MembersLogs from './components/MembersLogs.vue';
import { useRoute } from 'vue-router';
import MembersService from '@/service/MembersService';
import type { Member } from '@/types/ui/members';
import useAlert from '@/composables/useAlert';
import Skeleton from 'primevue/skeleton';
import type { AxiosError } from 'axios';
import InlineMessage from 'primevue/inlinemessage';

interface ModalsVisibility {
  apply_form: boolean;
  make_transaction: boolean;
  add_account: boolean;
}

interface Loadings {
  member_fetch: boolean;
}

const loadings = ref<Loadings>({
  member_fetch: false,
});

const confirm = useConfirm();
const route = useRoute();
const { showApiError, showSuccess } = useAlert();

const member_number = computed(() => (route.params.id ?? '').toString());
const member = ref<Member>();
const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
  make_transaction: false,
  add_account: false,
});

const basic_information = computed<InformationItem[]>(() => [
  { label: 'Surname', value: member.value?.surname ?? '' },
  { label: 'First Name', value: member.value?.first_name ?? '' },
  { label: 'Middle Name', value: member.value?.middle_name ?? '' },
  { label: 'Suffix (Jr. Sr.)', value: member.value?.name_extension ?? '' },
  { label: 'Date of Birth', value: member.value?.date_of_birth?.toString() ?? '' },
  { label: 'Place of Birth', value: 'Macrohon So. Leyte' },
  { label: 'Gender', value: 'Male' },
]);

const employment_information = computed<InformationItem[]>(() => [
  { label: 'Date Hired', value: 'Sept. 2, 1993' },
  { label: 'Department', value: 'IT' },
  { label: 'Position', value: 'Software Engineer' },
  { label: 'Employee No.', value: 'ID6585478' },
  { label: 'TIN No.', value: '00000' },
  { label: 'Email Address', value: 'kevin.loquencio@gmail.com' },
]);
const address_info = computed<InformationItem[]>(() => [
  {
    label: 'Present Address',
    value: member.value?.full_present_address ?? '',
  },
  {
    label: 'Status of Residence',
    value: 'Living with Parents',
  },
  {
    label: 'Permanent Address',
    value: member.value?.full_permanent_address ?? '',
  },
]);

const spouse_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Spouse',
    value: 'Kevin Loquencio',
  },
  { label: 'Date of Birth', value: 'Kevin' },
  { label: 'Occupation', value: 'Kevin' },
  { label: 'Contact Number', value: 'Kevin' },
]);

const father_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Father',
    value: 'Kevin Loquencio',
  },
  { label: 'Date of Birth', value: 'Kevin' },
  { label: 'Occupation', value: 'Kevin' },
  { label: 'Contact Number', value: 'Kevin' },
]);

const mother_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Mother',
    value: 'Kevin Loquencio',
  },
  { label: 'Date of Birth', value: 'Kevin' },
  { label: 'Occupation', value: 'Kevin' },
  { label: 'Contact Number', value: 'Kevin' },
]);

onMounted(() => {
  showMember();
});

const handleTerminateClick = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Account Termination',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {},
    reject: () => {},
  });
};

const showMember = async () => {
  loadings.value.member_fetch = true;
  try {
    const { data } = await MembersService.show(member_number.value);
    member.value = data;
    document.title = `DSPACC - ${member.value.full_name}`;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.member_fetch = false;
};

const handleDoneOrientation = () => {
  confirm.require({
    message: 'Do you want to update the orientation attendance?',
    header: 'Attended Orientation',
    acceptClass: 'p-button-primary',
    accept: async () => {
      try {
        await MembersService.postAttendedOrientation(member.value?.member_number ?? '');
        showSuccess('Orientation attendance updated.');
      } catch (error) {
        showApiError(error as AxiosError);
        handleDoneOrientation();
      }
    },
  });
};

const handleApplyLoanClick = () => {
  if (!member.value?.oriented)
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Member Not Attended Orientation',
      acceptClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        modalsVisibility.value.apply_form = true;
      },
    });
  else modalsVisibility.value.apply_form = true;
};
</script>
