<template>
  <DataTable
    :value="transactions"
    table-style="min-width: 50rem"
  >
    <Column
      v-if="!hideColumns?.includes('transaction_number')"
      field="transaction_number"
      header="Transaction No."
    ></Column>
    <Column
      v-if="!hideColumns?.includes('type')"
      field="type"
      header="Account"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('particular')"
      field="particular"
      header="Particular"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('date')"
      field="date"
      header="Date"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('withdrawals')"
      field="withdrawals"
      header="Withdrawals"
    ></Column>
    <Column
      v-if="!hideColumns?.includes('deposits')"
      field="deposits"
      header="Deposits"
    ></Column>

    <Column
      v-if="!hideColumns?.includes('running_balance')"
      field="running_balance"
      header="Balance"
    ></Column>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Ending Balance:"
          :colspan="6 - (hideColumns?.length ?? 0)"
          footer-style="text-align:right"
        />
        <Column footer="1,100.00" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import type { AccountTransactionHistory } from '@/types/ui/accounts';

interface Props {
  hideColumns?: string[];
  transactions?: AccountTransactionHistory[];
}

defineProps<Props>();
</script>
