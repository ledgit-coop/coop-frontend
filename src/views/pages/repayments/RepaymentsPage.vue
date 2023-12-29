<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <PageContentHeader title="Loan Repayments" />
        <DataTable
          :paginator="true"
          :row-hover="true"
          scrollable
          :value="loans"
          table-style="min-width: 50rem"
          v-model:expandedRows="expandedRows"
          :loading="loadings.table"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          :row-class="rowClassParent"
          @sort="onSort"
          export-filename="loan-repayments"
          @page="onPageChange"
          @update:rows="onRowsChange"
          ref="dt"
          :rowsPerPageOptions="[10, 20, 50, 100, 500, 1000]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <div class="flex gap-2">
                <Button
                  type="button"
                  icon="pi pi-filter-slash"
                  label="Clear"
                  class="p-button-outlined mb-2"
                  size="small"
                  @click="handleClearFilter"
                />

                <Button
                  type="button"
                  icon="pi pi-download"
                  label="Export Collections"
                  class="p-button-outlined mb-2"
                  size="small"
                  @click="modalsVisibility.collections = true"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <Calendar
                  date-format="M-dd-yy"
                  id="due-date"
                  mask="true"
                  v-model="filters.due_date"
                  selection-mode="range"
                  placeholder="Select due date"
                  showButtonBar
                  @hide="handleDueDateChange"
                  :hide-on-range-selection="true"
                  show-icon
                />

                <Dropdown
                  showClear
                  filter
                  v-model="filters.status"
                  :options="statuses"
                  option-value="value"
                  option-label="label"
                  placeholder="Select Status"
                  style="min-width: 10rem"
                  @change="handleStatusChanged"
                >
                </Dropdown>

                <span class="p-input-icon-left mb-2">
                  <i class="pi pi-search" />
                  <InputText
                    placeholder="Keyword Search"
                    v-model="filters.keyword"
                    @keydown.enter="loadTable"
                  />
                </span>
              </div>
            </div>
          </template>

          <template #empty> No records found. </template>

          <Column
            expander
            style="width: 5rem"
          />

          <Column
            field="member.full_name"
            header="Member"
            sort-field="member_id"
            sortable
          >
            <template #body="slotProps">
              <Button
                class="white-space-nowrap"
                :label="slotProps.data.member.full_name"
                @click="
                  router.push({
                    name: ROUTE_NAME_MEMBERS_VIEW,
                    params: { id: slotProps.data.member.id },
                  })
                "
                link
              />
            </template>
          </Column>

          <Column
            field="present_address"
            header="Present Address"
            sortable
            hidden
          >
          </Column>
          <Column
            field="home_address"
            header="Home Address"
            sortable
            hidden
          >
          </Column>
          <Column
            field="contact_number"
            header="Contact"
            sortable
            hidden
          >
          </Column>

          <Column
            field="loan_number"
            header="Loan No."
            sortable
          >
          </Column>

          <Column
            field="loan_product.name"
            sort-field="loan_product_id"
            header="Type"
            class="white-space-nowrap"
            sortable
          ></Column>

          <Column
            field="due_date"
            header="Due Date"
          >
            <template #body="slotProps">
              {{ dateFormat(slotProps.data.due_date, DATE_FORMAT_DATE) }}
            </template>
          </Column>

          <Column
            header="Due Amount"
            class="white-space-nowrap"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.loan_schedules && slotProps.data.loan_schedules.length > 0">
                {{
                  formatNumber(
                    slotProps.data.loan_schedules?.reduce(
                      (n: any, p: any) => n + Number(p?.outstanding_amount ?? 0),
                      0
                    ) ?? 0
                  )
                }}
              </span>
            </template>
          </Column>

          <Column
            header="#"
            class="white-space-nowrap"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.loan_schedules && slotProps.data.loan_schedules.length > 0">
                {{ slotProps.data.loan_schedules[0].due_humans }}
              </span>
            </template>
          </Column>

          <Column
            field="id"
            header="Action"
            align-frozen="right"
            style="min-width: 6rem; width: 6rem"
            :exportable="false"
            frozen
          >
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-eye"
                  v-tooltip="'View'"
                  text
                  raised
                  rounded
                  class="mr-2 mb-2"
                  size="small"
                  @click="handleViewLoanClick(slotProps.data)"
                />
                <Button
                  label="Pay"
                  icon="pi pi-eye"
                  class="p-button-raised mr-2 mb-2"
                  size="small"
                  v-if="!slotProps.data.paid"
                  @click="handlePayload(slotProps.data)"
                />
              </div>
            </template>
          </Column>

          <template #expansion="slotProps">
            <div class="p-3">
              <PageContentHeader
                size="h6"
                title="Incoming and Overdue Amoritization"
              />
              <DataTable
                :row-class="rowClass"
                showGridlines
                :value="slotProps.data.loan_schedules"
                ref="btb"
              >
                <template #header>
                  <div class="flex justify-content-between flex-column sm:flex-row">
                    <div class="flex gap-2">
                      <Button
                        type="button"
                        icon="pi pi-download"
                        label="Export"
                        class="p-button-outlined mb-2"
                        size="small"
                        @click="($refs as any)?.btb?.exportCSV()"
                      />
                    </div>
                  </div>
                </template>

                <template #empty>No incoming amortizations</template>

                <Column
                  header="Member"
                  hidden
                  sortable
                >
                  <template #body>
                    <span>{{ slotProps.data.member.full_name }}</span>
                  </template>
                </Column>

                <Column
                  header="Present Address"
                  sortable
                  hidden
                >
                  <template #body>
                    <span>{{ slotProps.data.present_address }}</span>
                  </template>
                </Column>
                <Column
                  header="Home Address"
                  sortable
                  hidden
                >
                  <template #body>
                    <span>{{ slotProps.data.home_address }}</span>
                  </template>
                </Column>
                <Column
                  header="Contact"
                  sortable
                  hidden
                >
                  <template #body>
                    <span>{{ slotProps.data.contact_number }}</span>
                  </template>
                </Column>

                <Column
                  header="Loan No."
                  sortable
                >
                  <template #body>
                    <span>{{ slotProps.data.loan_number }}</span>
                  </template>
                </Column>

                <Column
                  header="Type"
                  class="white-space-nowrap"
                  sortable
                  hidden
                >
                  <template #body>
                    <span>{{ slotProps.data.loan_product.name }}</span>
                  </template>
                </Column>

                <Column
                  field="due_date"
                  header="Due Date"
                  sortable
                >
                  <template #body="slotProps">
                    {{ dateFormat(slotProps.data.due_date, DATE_FORMAT_DATE) }}
                  </template>
                </Column>

                <Column
                  field="principal_amount"
                  header="Principal"
                >
                  <template #body="slotProps">
                    {{ formatNumber(slotProps.data.principal_amount) }}
                  </template>
                </Column>

                <Column
                  field="interest_amount"
                  header="Interest"
                >
                  <template #body="slotProps">
                    {{ formatNumber(slotProps.data.interest_amount) }}
                  </template>
                </Column>

                <Column
                  field="penalty_amount"
                  header="Penalty"
                >
                  <template #body="slotProps">
                    {{ formatNumber(slotProps.data.penalty_amount) }}
                  </template>
                </Column>

                <Column
                  field="outstanding_amount"
                  header="Due Amount"
                >
                  <template #body="slotProps">
                    {{ formatNumber(slotProps.data.outstanding_amount) }}
                  </template>
                </Column>

                <Column
                  field="amount_paid"
                  header="Amount Paid"
                >
                  <template #body="slotProps">
                    {{ formatNumber(slotProps.data.amount_paid) }}
                  </template>
                </Column>

                <Column
                  field="due_humans"
                  header="#"
                  class="white-space-nowrap"
                  sortable
                ></Column>
              </DataTable>
              <Button
                link
                @click="handleViewAllAmortiztion(slotProps.data)"
                :label="`View All Amortization`"
                icon="pi pi-arrow-right"
              />
            </div>
          </template>
        </DataTable>

        <RepaymentCreate
          @updated="loadTable"
          v-model:visible="modalsVisibility.repay"
          :due-amount="dueAmount"
          :overdue-amount="overDueAmount"
          :schedule-id="scheduleId"
          :outstanding-amount="selected_loan?.outstanding"
        />

        <RepaymentCollectionExport v-model:visible="modalsVisibility.collections" />

        <LoanView
          :tab-view="(tabView as any)"
          v-model:visible="modalsVisibility.view_loan"
          :loan-id="selectedLoanId"
          @hide="tabView = undefined"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanRepaymentService from '@/service/LoanRepaymentService';
import router from '@/router';
import RepaymentCreate from './RepaymentCreate.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import type { DropdownOption } from '@/types/ui';
import Calendar from 'primevue/calendar';
import { DATE_FORMAT_DATE, DATE_FORMAT_DB, ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import useTableParameters from '@/composables/useTableParameters';
import LoanView from '@/components/LoanView.vue';
import { dateFormat, formatNumber } from '@/helpers';
import type { Loan } from '@/types/ui/loans';
import type { MemberLoanSchedule } from '@/types/ui/members';
import moment from 'moment';
import RepaymentCollectionExport from './RepaymentCollectionExport.vue';

interface ModalsVisibility {
  repay: boolean;
  view_loan: boolean;
  collections: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  repay: false,
  view_loan: false,
  collections: false,
});

const statuses = ref<DropdownOption[]>([
  { label: 'Past Due', value: 'past-due' },
  { label: 'Due Today', value: 'due-today' },
  { label: 'Due in 4 days', value: 'due-4-days' },
  { label: 'Due Next Month', value: 'due-next-month' },
  { label: 'Paid', value: 'paid' },
]);
const dt = ref();
const loans = ref<Loan[]>([]);
const selected_loan = ref<Loan | undefined>();
const filters = ref({
  keyword: undefined,
  status: undefined,
  due_date: undefined,
});
const tabView = ref<any>('info');
const { rows, onSort, paginate, totalRecords, onPageChange, params, onRowsChange } = useTableParameters(filters);
const expandedRows = ref<any>([]);

const dueAmount = computed<any>(() =>
  selected_loan.value?.loan_schedules?.reduce((n: any, p: any) => n + Number(p?.outstanding_amount ?? 0), 0)
);

const overDueAmount = computed<any>(() =>
  selected_loan.value?.loan_schedules
    ?.filter((r) => r.overdue)
    .reduce((n: any, p: any) => n + Number(p?.outstanding_amount ?? 0), 0)
);

const scheduleId = computed<any>(() =>
  selected_loan.value?.loan_schedules ? selected_loan.value?.loan_schedules[0].id : 0
);
const selectedLoanId = computed<any>(() => selected_loan.value?.id);
const loadings = ref({
  table: false,
});

const { showApiError } = useAlert();

onMounted(() => {
  loadTable();
});

watch(params, () => {
  loadTable();
});

const loadTable = async () => {
  if (loadings.value.table) return;
  loadings.value.table = true;
  LoanRepaymentService.list({
    ...params.value,
    filters: {
      ...params.value.filters,
      due_date: filters.value.due_date
        ? [
            moment(filters.value.due_date[0]).format(DATE_FORMAT_DB),
            moment(filters.value.due_date[1]).format(DATE_FORMAT_DB),
          ]
        : undefined,
    },
  })
    .then(({ data }) => {
      loans.value = data.data.filter((r) => r.loan_schedules && r.loan_schedules.length > 0);
      paginate(data);
    })
    .catch((error) => {
      showApiError(error as AxiosError);
    })
    .finally(() => {
      loadings.value.table = false;
    });
};
const handlePayload = (value: Loan) => {
  selected_loan.value = value;
  modalsVisibility.value.repay = true;
};

const handleStatusChanged = () => {
  loadTable();
};
const handleDueDateChange = () => {
  filters.value.status = undefined;
  loadTable();
};

const handleClearFilter = () => {
  filters.value = {
    keyword: undefined,
    status: undefined,
    due_date: undefined,
  };
  loadTable();
};

const handleViewLoanClick = (value: Loan) => {
  selected_loan.value = value;
  modalsVisibility.value.view_loan = true;
};

const handleViewAllAmortiztion = (value: Loan) => {
  selected_loan.value = value;
  modalsVisibility.value.view_loan = true;
  tabView.value = 'amortization';
};

const rowClassParent = (loan: Loan) => {
  const data: MemberLoanSchedule | undefined =
    loan.loan_schedules && loan.loan_schedules.length > 0 ? loan.loan_schedules[0] : undefined;
  if (data) {
    if (data.paid) return 'paid';
    else if (data.almost_due) return 'almost-due';
    else if (data.overdue) return 'overdue';
  }
};

const rowClass = (data: MemberLoanSchedule) => {
  if (data.paid) return 'paid';
  else if (data.almost_due) return 'almost-due';
  else if (data.overdue) return 'overdue';
};
</script>
