<template>
  <div class="grid">
    <div class="col-12">
      <InlineMessage
        v-if="member && !member?.oriented"
        severity="error"
        >Not attended PMES (Pre-membership Education Seminar).</InlineMessage
      >
      <InlineMessage
        v-if="member && member?.oriented"
        severity="success"
        class="mt-2"
        >Attended PMES (Pre-membership Education Seminar).</InlineMessage
      >
      <div class="card">
        <div class="grid m-0 align-items-center">
          <Image
            alt="Image"
            height="50"
            class="align-self-center"
            preview
            image-class="border-circle"
            v-if="member?.profile_picture_url"
            :src="member?.profile_picture_url"
          />
          <Avatar
            v-else
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
            <template v-if="member.status == MemberStatus.ACTIVE">
              <Button
                icon="pi pi-arrow-left"
                label="Back"
                rounded
                outlined
                @click="router.push({ name: ROUTE_NAME_MEMBERS })"
              ></Button>

              <Button
                icon="pi pi-print"
                label="Print"
                rounded
                outlined
                disabled
              ></Button>

              <Button
                icon="pi pi-pencil"
                label="Edit"
                severity="warning"
                rounded
                outlined
                @click="router.push({ name: ROUTE_NAME_MEMBERS_EDIT, params: { id: member.id } })"
              ></Button>

              <Button
                icon="pi pi-print"
                label="Apply Loan"
                rounded
                outlined
                @click="handleApplyLoanClick"
              ></Button>

              <Button
                icon="pi pi-check"
                label="Done PMES"
                rounded
                :loading="loadings.oriented"
                outlined
                v-if="!member.oriented"
                @click="handleDoneOrientation"
              ></Button>

              <Button
                icon="pi pi-plus"
                label="Add Account"
                rounded
                outlined
                @click="modalsVisibility.add_account = true"
              ></Button>

              <Button
                icon="pi pi-plus"
                label="Add Transaction"
                @click="modalsVisibility.make_transaction = true"
                rounded
                outlined
              ></Button>
            </template>

            <Button
              icon="pi pi-print"
              label="Terminate"
              rounded
              outlined
              severity="danger"
              :loading="loadings.update_status"
              v-if="member.status === MemberStatus.ACTIVE"
              @click="handleChangeStatus(MemberStatus.TERMINATED)"
            ></Button>

            <template v-else-if="member.status === MemberStatus.TERMINATED">
              <Button
                icon="pi pi-trash"
                label="Delete"
                rounded
                outlined
                severity="danger"
                :loading="loadings.delete"
                @click="handleMemberDelete()"
              ></Button>

              <Button
                icon="pi pi-check"
                label="Activate"
                rounded
                outlined
                severity="success"
                :loading="loadings.update_status"
                @click="handleChangeStatus(MemberStatus.ACTIVE)"
              ></Button>
            </template>
          </div>
        </div>

        <div class="mt-3">
          <TabView
            v-model:active-index="activeIndex"
            scrollable
          >
            <TabPanel header="Member Information">
              <template v-if="activeIndex === 0">
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
                        table-class="w-7"
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
                        table-class="w-4"
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
                    <div class="col-12 p-0 md:col-6">
                      <DataTable
                        :loading="loadings.member_fetch"
                        :value="member?.beneficiaries ?? []"
                      >
                        <template #empty> No records found. </template>

                        <Column
                          field="name"
                          header="Name"
                        >
                          <template #body="slotProps">
                            {{ slotProps.data.name ?? '--' }}
                          </template>
                        </Column>

                        <Column
                          field="birthdate"
                          header="Birthdate"
                        >
                          <template #body="slotProps">
                            {{ slotProps.data.birthdate ?? '--' }}
                          </template>
                        </Column>

                        <Column
                          field="relationship"
                          header="Relationship"
                        >
                          <template #body="slotProps">
                            {{ slotProps.data.relationship ?? '--' }}
                          </template>
                        </Column>
                      </DataTable>
                    </div>
                  </div>

                  <div class="grid mt-4">
                    <div class="col-12 p-0">
                      <h6>In Case of Emergency</h6>
                    </div>
                    <div class="col-12 p-0">
                      <Information
                        :loading="loadings.member_fetch"
                        :info="incase_emergency_information"
                        table-class="w-4"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </TabPanel>
            <TabPanel header="Share Capital">
              <MembersShareCapital
                v-if="activeIndex == 1"
                :member="member"
              />
            </TabPanel>
            <TabPanel header="Savings">
              <MembersSavings
                v-if="activeIndex == 2"
                :member="member"
              />
            </TabPanel>
            <TabPanel header="Loans">
              <MembersLoans
                v-if="activeIndex == 3"
                :member="member"
              />
            </TabPanel>
            <TabPanel header="Accounts">
              <MembersAccounts
                v-if="activeIndex == 4"
                :member="member"
              />
            </TabPanel>

            <TabPanel
              :disabled="true"
              header="Income"
            >
              <MembersIncome />
            </TabPanel>

            <TabPanel header="Logs">
              <MembersLogs
                :member="member"
                v-if="activeIndex == 6"
              />
            </TabPanel>
          </TabView>
          <LoanSave
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
import { DATE_FORMAT, ROUTE_NAME_MEMBERS, ROUTE_NAME_MEMBERS_EDIT } from '@/constants';
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
import LoanSave from '@/components/LoanSave.vue';
import Image from 'primevue/image';
import MembersIncome from './components/MembersIncome.vue';
import { MemberStatus } from '@/constants/ui/members';
import { dateFormat } from '@/helpers';
import DataTable from 'primevue/datatable';

interface ModalsVisibility {
  apply_form: boolean;
  make_transaction: boolean;
  add_account: boolean;
}

const loadings = ref({
  member_fetch: false,
  oriented: false,
  update_status: false,
  delete: false,
});

const confirm = useConfirm();
const route = useRoute();
const { showApiError, showSuccess } = useAlert();
const activeIndex = ref(0);
const member_id = computed(() => (route.params.id ?? '').toString());
const member = ref<Member>();
const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
  make_transaction: false,
  add_account: false,
});

const basic_information = computed<InformationItem[]>(() => [
  { label: 'Member No.', value: member.value?.member_number ?? '' },
  { label: 'Surname', value: member.value?.surname ?? '' },
  { label: 'First Name', value: member.value?.first_name ?? '' },
  { label: 'Middle Name', value: member.value?.middle_name ?? '' },
  { label: 'Suffix (Jr. Sr.)', value: member.value?.name_extension ?? '' },
  { label: 'Date of Birth', value: member.value?.date_of_birth?.toString() ?? '' },
  { label: 'Place of Birth', value: member.value?.place_of_birth ?? '' },
  { label: 'Civil Status', value: member.value?.civil_status ?? '' },
  { label: 'Gender', value: member.value?.gender ?? '' },
]);

const employment_information = computed<InformationItem[]>(() => [
  { label: 'Date Hired', value: dateFormat(member.value?.date_hired, DATE_FORMAT) },
  { label: 'Department', value: member.value?.department ?? '' },
  { label: 'Position', value: member.value?.position ?? '' },
  { label: 'Employee No.', value: member.value?.employee_no ?? '' },
  { label: 'TIN No.', value: member.value?.tin_no ?? '' },
  { label: 'Email Address', value: member.value?.email_address ?? '' },
]);
const address_info = computed<InformationItem[]>(() => [
  {
    label: 'Present Address',
    value: member.value?.full_present_address ?? '',
  },
  {
    label: 'Status of Residence',
    value: member.value?.residency_status ?? '',
  },
  {
    label: 'Permanent Address',
    value: member.value?.full_permanent_address ?? '',
  },
]);

const spouse_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Spouse',
    value: [
      member.value?.spouse?.first_name ?? '',
      member.value?.spouse?.middle_name ?? '',
      member.value?.spouse?.surname ?? '',
    ],
  },
  { label: 'Date of Birth', value: dateFormat(member.value?.spouse?.date_of_birth, DATE_FORMAT) },
  { label: 'Occupation', value: member.value?.spouse?.occupation ?? '' },
  { label: 'Contact Number', value: member.value?.spouse?.contact_number ?? '' },
]);

const incase_emergency_information = computed<InformationItem[]>(() => [
  {
    label: 'Name',
    value: member.value?.in_case_emergency_contact ?? '',
  },
  { label: 'Address', value: member.value?.in_case_emergency_address ?? '' },
  { label: 'Contact', value: member.value?.in_case_emergency_contact ?? '' },
]);

const father_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Father',

    value: [
      member.value?.father?.first_name ?? '',
      member.value?.father?.middle_name ?? '',
      member.value?.father?.surname ?? '',
    ],
  },
  { label: 'Date of Birth', value: dateFormat(member.value?.father?.date_of_birth, DATE_FORMAT) },
  { label: 'Occupation', value: member.value?.father?.occupation ?? '' },
  { label: 'Contact Number', value: member.value?.father?.contact_number ?? '' },
]);

const mother_information = computed<InformationItem[]>(() => [
  {
    label: 'Name of Mother',
    value: [
      member.value?.mother?.first_name ?? '',
      member.value?.mother?.middle_name ?? '',
      member.value?.mother?.surname ?? '',
    ],
  },
  { label: 'Date of Birth', value: dateFormat(member.value?.mother?.date_of_birth, DATE_FORMAT) },
  { label: 'Occupation', value: member.value?.mother?.occupation ?? '' },
  { label: 'Contact Number', value: member.value?.mother?.contact_number ?? '' },
]);

onMounted(() => {
  showMember();
});

const showMember = async () => {
  loadings.value.member_fetch = true;
  try {
    const { data } = await MembersService.show(member_id.value);
    member.value = data;
    document.title = `DSPACC - ${member.value.full_name}`;
  } catch (error) {
    showApiError(error as AxiosError);
  }
  loadings.value.member_fetch = false;
};

const handleChangeStatus = (status: MemberStatus) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: `Account ${status === MemberStatus.TERMINATED ? 'Termination' : 'Activate'}`,
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      loadings.value.update_status = true;
      try {
        await MembersService.updateStatus(member.value?.id?.toString() ?? '', status);
        showSuccess('Member status updated successfully.');
        member.value!.status = status;
        showMember();
      } catch (error) {
        showApiError(error as AxiosError);
      }
      loadings.value.update_status = false;
    },
  });
};

const handleDoneOrientation = () => {
  confirm.require({
    message: 'Do you want to update the orientation attendance?',
    header: 'Attended Orientation',
    acceptClass: 'p-button-primary',
    accept: async () => {
      loadings.value.oriented = true;

      try {
        await MembersService.postAttendedOrientation(member.value?.id ?? '');
        showSuccess('Orientation attendance updated.');
        member.value!.oriented = true;
      } catch (error) {
        showApiError(error as AxiosError);
        handleDoneOrientation();
      }
      loadings.value.oriented = false;
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

const handleMemberDelete = () => {
  confirm.require({
    message:
      'Please note that proceeding with this action will result in the complete removal of the record from the system. Are you certain you wish to continue?',
    header: 'Delete Member',
    acceptClass: 'p-button-danger',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      loadings.value.delete = true;
      try {
        await MembersService.destroy(member_id.value);
        showSuccess('Member has been deleted successfully.');
        setTimeout(() => {
          router.push({ name: ROUTE_NAME_MEMBERS });
        }, 1500);
      } catch (error) {
        showApiError(error as AxiosError);
      }
      loadings.value.delete = false;
    },
  });
};
</script>
