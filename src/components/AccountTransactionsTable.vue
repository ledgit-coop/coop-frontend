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
    >
      <template #body="slotProps">
        <div class="flex gap-2 align-items-center">
          <Tag
            v-if="slotProps.data.posted"
            severity="success"
            rounded
            v-tooltip="'Posted'"
            class="white-space-nowrap"
          ></Tag>

          <Tag
            v-else
            severity="warning"
            rounded
            v-tooltip="'Unposted'"
            class="white-space-nowrap"
          ></Tag>
          <span>{{ slotProps.data.transaction_number }}</span>
        </div>
      </template>
    </Column>
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

    <template v-if="!display || (display && display === 'transactional')">
      <Column
        v-if="!hideColumns?.includes('withdrawals')"
        field="withdrawals"
        header="Withdrawal"
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
        header="Deposit"
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
    </template>
    <template v-else-if="display && display === 'summary'">
      <Column
        v-if="!hideColumns?.includes('amount')"
        field="amount"
        header="Amount"
        style="text-wrap: nowrap"
      >
        <template #body="slotProps">
          <template v-if="slotProps.data.transaction_type === AccountTransactionType.DEPOSIT">
            {{ formatCurrency(Math.abs(slotProps.data.amount)) }}
          </template>
          <template v-if="slotProps.data.transaction_type === AccountTransactionType.WITHDRAWAL">
            ({{ formatCurrency(Math.abs(slotProps.data.amount)) }})
          </template>
        </template>
      </Column>
    </template>

    <Column
      v-if="!hideColumns?.includes('running_balance') && !(display && display === 'summary')"
      field="running_balance"
      header="Running Balance"
      style="text-wrap: nowrap"
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.remaining_balance) }}
      </template>
    </Column>

    <Column
      v-if="showAction"
      field="id"
      header="Action"
      align-frozen="right"
      frozen
    >
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2">
          <Button
            icon="pi pi-trash"
            v-tooltip="'Delete unposted transaction'"
            text
            raised
            rounded
            class="mr-2 mb-2"
            size="small"
            severity="danger"
            @click="$emit('onDeleteClick', slotProps.data)"
          />
        </div>
      </template>
    </Column>

    <template #empty> No records found. </template>

    <ColumnGroup type="footer">
      <Row>
        <Column
          footer="Total:"
          :colspan="6 - (hideColumns?.length ?? 0) - (display && display === 'summary' ? 2 : 0)"
          footer-style="text-align:right"
        />
        <Column
          class="white-space-nowrap"
          :footer="formatCurrency(transactions?.reduce((n, p) => n + Number(p?.amount ?? 0), 0) ?? 0)"
        />
        <Column
          v-if="showAction"
          footer-style="text-align:right"
        />
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
import Tag from 'primevue/tag';

interface Props {
  hideColumns?: string[];
  transactions?: AccountTransaction[];
  loading?: boolean;
  showAction?: boolean;
  display?: 'transactional' | 'summary';
}

defineProps<Props>();

defineEmits(['onDeleteClick']);
</script>
