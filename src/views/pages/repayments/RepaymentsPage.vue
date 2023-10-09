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
          :row-class="rowClass"
          :loading="loadings.table"
          :rows="rows"
          :lazy="true"
          :total-records="totalRecords"
          @sort="onSort"
          export-filename="loan-repayments"
          @page="onPageChange"
          ref="dt"
          :rowsPerPageOptions="[10, 20, 50, 100]"
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
                  label="Export"
                  class="p-button-outlined mb-2"
                  size="small"
                  @click="handleExport"
                />
              </div>

              <div class="grid gap-1 m-0 align-items-start ml-auto">
                <Calendar
                  date-format="yy-mm-dd"
                  id="date-hired"
                  mask="true"
                  v-model="filters.due_date"
                  placeholder="Due date"
                  showButtonBar
                  @update:model-value="handleDueDateChange"
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
            field="loan.member.full_name"
            header="Member"
            sortable
          >
            <template #body="slotProps">
              <Button
                class="white-space-nowrap"
                :label="slotProps.data.loan.member.full_name"
                @click="
                  router.push({
                    name: ROUTE_NAME_MEMBERS_VIEW,
                    params: { id: slotProps.data.loan.member.id },
                  })
                "
                link
              />
            </template>
          </Column>

          <Column
            field="loan.present_address"
            header="Present Address"
            sortable
            hidden
          >
          </Column>
          <Column
            field="loan.home_address"
            header="Home Address"
            sortable
            hidden
          >
          </Column>
          <Column
            field="loan.contact_number"
            header="Contact"
            sortable
            hidden
          >
          </Column>

          <Column
            field="loan.loan_number"
            header="Loan No."
            sortable
          >
          </Column>

          <Column
            field="loan.loan_product.name"
            header="Type"
            class="white-space-nowrap"
            sortable
          ></Column>

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
            field="penalty_amount"
            header="Penalty"
          >
            <template #body="slotProps">
              {{
                Number(slotProps.data.penalty_amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </template>
          </Column>

          <Column
            field="outstanding_amount"
            header="Due Amount"
          >
            <template #body="slotProps">
              {{
                Number(slotProps.data.outstanding_amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </template>
          </Column>

          <Column
            field="amount_paid"
            header="Amount Paid"
          >
            <template #body="slotProps">
              {{
                Number(slotProps.data.amount_paid).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </template>
          </Column>

          <Column
            field="due_humans"
            header="#"
            class="white-space-nowrap"
            sortable
          ></Column>

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
        </DataTable>

        <RepaymentCreate
          @updated="loadTable"
          v-model:visible="modalsVisibility.repay"
          :due-amount="dueAmount"
          :schedule-id="scheduleId"
        />

        <LoanView
          v-model:visible="modalsVisibility.view_loan"
          :loan-id="selectedLoanId"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import type { MemberLoanSchedule } from '@/types/ui/members';
import PageContentHeader from '@components/PageContentHeader.vue';
import LoanRepaymentService from '@/service/LoanRepaymentService';
import router from '@/router';
import RepaymentCreate from './RepaymentCreate.vue';
import useAlert from '@/composables/useAlert';
import type { AxiosError } from 'axios';
import type { DropdownOption } from '@/types/ui';
import Calendar from 'primevue/calendar';
import { DATE_FORMAT_DATE, ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import useTableParameters from '@/composables/useTableParameters';
import LoanView from '@/components/LoanView.vue';
import { dateFormat } from '@/helpers';

interface ModalsVisibility {
  repay: boolean;
  view_loan: boolean;
}

const modalsVisibility = ref<ModalsVisibility>({
  repay: false,
  view_loan: false,
});

const statuses = ref<DropdownOption[]>([
  { label: 'Past Due', value: 'past-due' },
  { label: 'Due Today', value: 'due-today' },
  { label: 'Due in 4 days', value: 'due-4-days' },
  { label: 'Due Next Month', value: 'due-next-month' },
  { label: 'Paid', value: 'paid' },
]);
const dt = ref();
const loans = ref<MemberLoanSchedule[]>([]);
const selected_loan = ref<MemberLoanSchedule | undefined>();
const filters = ref({
  keyword: undefined,
  status: undefined,
  due_date: undefined,
});

const { rows, onSort, paginate, totalRecords, onPageChange, params } = useTableParameters(filters);

const dueAmount = computed<any>(() => selected_loan.value?.due_amount);
const scheduleId = computed<any>(() => selected_loan.value?.id);
const selectedLoanId = computed<any>(() => selected_loan.value?.loan_id);
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
  loadings.value.table = true;
  try {
    const { data } = await LoanRepaymentService.list({ ...params.value });
    loans.value = data.data;
    paginate(data);
  } catch (error) {
    showApiError(error as AxiosError);
  }

  loadings.value.table = false;
};
const handlePayload = (value: MemberLoanSchedule) => {
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
const handleExport = () => {
  dt.value.exportCSV();
};

const handleClearFilter = () => {
  filters.value = {
    keyword: undefined,
    status: undefined,
    due_date: undefined,
  };
  loadTable();
};

const handleViewLoanClick = (value: MemberLoanSchedule) => {
  selected_loan.value = value;
  modalsVisibility.value.view_loan = true;
};

const rowClass = (data: MemberLoanSchedule) => {
  if (data.paid) return 'paid';
  else if (data.almost_due) return 'almost-due';
  else if (data.overdue) return 'overdue';
};
</script>
