<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="grid align-items-center">
          <Avatar
            label="P"
            class="mr-2"
            size="xlarge"
            shape="circle"
          ></Avatar>
          <div class="flex flex-column ml-2">
            <h4 class="m-0">Kevin Loquencio</h4>
            <small>Member since: 2023</small>
          </div>
          <div class="ml-auto grid gap-2">
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
              icon="pi pi-print"
              label="Apply Loan"
              @click="modalsVisibility.apply_form = true"
            ></Button>
            <Button
              icon="pi pi-print"
              label="Make Transaction"
              @click="modalsVisibility.apply_form = true"
            ></Button>
          </div>
        </div>

        <div class="mt-3">
          <TabView>
            <TabPanel header="Member Information">
              <div class="p-3">
                <div class="grid mt-2">
                  <div class="col-12 p-0">
                    <h6>Member Information</h6>
                  </div>

                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information :info="basic_information" />
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information :info="employment_information" />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Addresses</h6>
                  </div>
                  <div class="col-12 p-0">
                    <Information :info="address_info" />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Spouse</h6>
                  </div>
                  <div class="col-12 p-0">
                    <Information :info="spouse_information" />
                  </div>
                </div>

                <div class="grid mt-4">
                  <div class="col-12 p-0">
                    <h6>Parents Information</h6>
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information :info="father_information" />
                  </div>
                  <div class="col-12 p-0 md:col-6 lg:col-4">
                    <Information :info="mother_information" />
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
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                eligendi optio cumque nihil impedit quo minus.
              </p>
            </TabPanel>
          </TabView>
          <ApplyLoan
            member_id="12231"
            v-model:visible="modalsVisibility.apply_form"
            :disable_member="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Avatar from 'primevue/avatar';
import Information from '@/views/components/Information.vue';
import type { InformationItem } from '@/types/ui';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import router from '@/router';
import MembersShareCapital from './components/MembersShareCapital.vue';
import MembersLoans from './components/MembersLoans.vue';
import ApplyLoan from '@/views/components/ApplyLoan.vue';
import { ROUTE_NAME_MEMBERS } from '@/constants';
import MembersSavings from './components/MembersSavings.vue';

interface ModalsVisibility {
  apply_form: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  apply_form: false,
});

const basic_information = computed<InformationItem[]>(() => [
  { label: 'Surname', value: 'Loqencio' },
  { label: 'First Name', value: 'Kevin' },
  { label: 'Middle Name', value: 'Muldez' },
  { label: 'Suffix (Jr. Sr.)', value: 'N/A' },
  { label: 'Date of Birth', value: 'Sept. 2, 1993' },
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
    value: 'Block 19, Lot 2 La Aldea Lapu Lapu City 6015',
  },
  {
    label: 'Status of Residence',
    value: 'Living with Parents',
  },
  {
    label: 'Permanent Address',
    value:
      'Block 19, Lot 2 La Aldea Lapu Lapu City 6015 Block 19, Lot 2 La Aldea Lapu Lapu City 6015 Block 19, Lot 2 La Aldea Lapu Lapu City 6015 Block 19, Lot 2 La Aldea Lapu Lapu City 6015 Block 19, Lot 2 La Aldea Lapu Lapu City 6015',
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

onMounted(()=>{
  document.title = 'DSPACC - Member (Kevin Loquencio)';
})
</script>
