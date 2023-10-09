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
          @click="($refs as any)?.table?.exportCSV()"
        />
      </div>
    </template>

    <Column
      v-if="!hideColumns?.includes('transaction_number')"
      field="transaction_number"
      header="TN"
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
    >
    </Column>

    <Column
      v-if="!hideColumns?.includes('date')"
      field="transaction_date"
      header="Date"
      style="text-wrap: nowrap"
    >
      <template #body="slotProps">
        {{ dateFormat(slotProps.data.transaction_date, DATE_FORMAT_DATE) }}
      </template>
    </Column>

    <Column
      v-if="!hideColumns?.includes('withdrawals')"
      field="withdrawals"
      header="Withdrawals"
      style="text-wrap: nowrap"
    >
      <template #body="slotProps">
        {{
          slotProps.data.transaction_type === AccountTransactionType.WITHDRAWAL
            ? formatCurrency(Math.abs(slotProps.data.amount))
            : ''
        }}
      </template>
    </Column>
    <Column
      v-if="!hideColumns?.includes('deposits')"
      field="deposits"
      header="Deposits"
      style="text-wrap: nowrap"
    >
      <template #body="slotProps">
        {{
          slotProps.data.transaction_type === AccountTransactionType.DEPOSIT
            ? formatCurrency(Math.abs(slotProps.data.amount))
            : ''
        }}
      </template>
    </Column>

    <Column
      v-if="!hideColumns?.includes('running_balance')"
      field="running_balance"
      header="Balance"
      style="text-wrap: nowrap"
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
        <Column :footer="formatCurrency(transactions?.reduce((n, p) => n + Number(p?.amount ?? 0), 0) ?? 0)" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
<script setup lang="ts">
import { DATE_FORMAT_DATE } from '@/constants';
import { AccountTransactionType } from '@/constants/ui/accounts';
import { dateFormat, formatCurrency } from '@/helpers';
import type { AccountTransaction } from '@/types/ui/accounts';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';

interface Props {
  hideColumns?: string[];
  transactions?: AccountTransaction[];
  loading?: boolean;
}

defineProps<Props>();
</script>
