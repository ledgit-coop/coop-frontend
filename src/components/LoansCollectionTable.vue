<template>
  <DataTable
    scrollable
    :value="loans"
    table-style="min-width: 50rem"
    :row-class="({ status }) => (status === MemberLoanStatus.OVERDUE ? 'text-red-500' : undefined)"
  >
    <!-- Inheret template -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <template #empty> No loans found. </template>
    <template #loading> Loading loans data. Please wait. </template>

    <Column
      v-if="!hideColumns?.includes('member')"
      field="member"
      header="Member"
      sortable
    >
      <template #body="slotProps">
        <Button
          class="white-space-nowrap"
          :label="slotProps.data.member"
          link
          @click="router.push({ name: ROUTE_NAME_MEMBERS_VIEW, params: { id: slotProps.data.member_number } })"
        />
      </template>
    </Column>

    <Column
      v-if="!hideColumns?.includes('loan_number')"
      field="loan_number"
      header="Loan No."
      sortable
    >
    </Column>

    <Column
      v-if="!hideColumns?.includes('loan_number')"
      field="loan_number"
      header="Contact No."
      sortable
    >
    </Column>

    <Column
      v-if="!hideColumns?.includes('loan_number')"
      field="loan_number"
      header="Address"
      sortable
    >
    </Column>

    <Column
      v-if="!hideColumns?.includes('type')"
      field="type"
      header="Type"
      class="white-space-nowrap"
      sortable
    ></Column>

    <Column
      v-if="!hideColumns?.includes('due_date')"
      field="due_date"
      header="Due Date"
      sortable
    ></Column>

    <Column
      v-if="!hideColumns?.includes('due_amount')"
      field="due_amount"
      header="Penalty"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.due_amount) }}
      </template>
    </Column>

    <Column
      v-if="!hideColumns?.includes('due_amount')"
      field="due_amount"
      header="Due Amount"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.due_amount) }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { MemberLoanStatus } from '@/constants/ui/members';
import type { MemberLoanTable } from '@/types/ui/members';
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import { ROUTE_NAME_MEMBERS_VIEW } from '@/constants';
import Button from 'primevue/button';
import { formatCurrency } from '@/helpers';

interface Props {
  hideColumns?: string[];
  modelValue?: MemberLoanTable[];
}

const props = defineProps<Props>();
const loans = ref<MemberLoanTable[]>([]);
const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  loans.value = props.modelValue ?? [];
});

watch(
  () => loans.value,
  (value: MemberLoanTable[]) => {
    emit('update:modelValue', value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: MemberLoanTable[] | undefined) => {
    loans.value = value ?? [];
  }
);
</script>
