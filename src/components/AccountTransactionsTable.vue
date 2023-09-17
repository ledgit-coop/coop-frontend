<template>
  <DataTable
    :loading="loading"
    :value="transactions"
    table-style="min-width: 50rem"
    ref="table"
    export-filename="account-transactions"
  >
    <template #header>
      <div class="flex justify-content-between flex-column sm:flex-row">
        <Button
          type="button"
          icon="pi pi-download"
          label="Export"
          class="p-button-outlined mb-2"
          size="small"
          @click="$refs?.table?.exportCSV()"
        />
      </div>
    </template>

    <Column
      v-if="!hideColumns?.includes('transaction_number')"
      field="transaction_number"
      header="Transaction No."
    ></Column>
    <Column
      v-if="!hideColumns?.includes('type')"
      field="account_name"
      header="Account"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('particular')"
      field="particular"
      header="Particular"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('date')"
      field="transaction_date"
      header="Date"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('withdrawals')"
      field="withdrawals"
      header="Withdrawals"
    >
      <template #body="slotProps">
        {{
          slotProps.data.transaction_type === AccountTransactionType.WITHDRAWAL
            ? formatCurrency(slotProps.data.amount)
            : ''
        }}
      </template>
    </Column>
    <Column
      v-if="!hideColumns?.includes('deposits')"
      field="deposits"
      header="Deposits"
    >
      <template #body="slotProps">
        {{
          slotProps.data.transaction_type === AccountTransactionType.DEPOSIT
            ? formatCurrency(slotProps.data.amount)
            : ''
        }}
      </template>
    </Column>

    <Column
      v-if="!hideColumns?.includes('running_balance')"
      field="running_balance"
      header="Balance"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.remaining_balance) }}
      </template>
    </Column>

    <template #empty> No records found. </template>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total:"
          :colspan="6 - (hideColumns?.length ?? 0)"
          footer-style="text-align:right"
        />
        <Column :footer="formatCurrency(transactions?.reduce((n, p) => n + (p?.amount ?? 0), 0) ?? 0)" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
<script setup lang="ts">
import { AccountTransactionType } from '@/constants/ui/accounts';
import { formatCurrency } from '@/helpers';
import type { AccountTransaction } from '@/types/ui/accounts';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';

interface Props {
  hideColumns?: string[];
  transactions?: AccountTransaction[];
  loading?: boolean;
}

defineProps<Props>();
</script>
