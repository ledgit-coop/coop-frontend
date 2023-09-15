<template>
  <Tag
    v-if="status == MemberLoanStatus.APPROVED"
    severity="success"
    rounded
    value="Approved"
    class="white-space-nowrap"
  ></Tag>
  <Tag
    v-else-if="status == MemberLoanStatus.EVAULUATION"
    severity="info"
    value="Under evaluation"
    rounded
    class="white-space-nowrap"
  ></Tag>
  <Tag
    v-else-if="status == MemberLoanStatus.PAID"
    severity="info"
    value="Fully Paid"
    class="white-space-nowrap loan-paid"
    rounded
  ></Tag>

  <Tag
    v-else-if="status == MemberLoanStatus.PRE_APPROVED"
    severity="info"
    value="Pre-Approved"
    class="white-space-nowrap loan-pre-approved"
    rounded
  ></Tag>

  <Tag
    v-else-if="status == MemberLoanStatus.PENDING"
    severity="warning"
    value="Pending"
    class="white-space-nowrap"
    rounded
  ></Tag>
  <Tag
    v-else-if="status == MemberLoanStatus.REJECTED"
    severity="danger"
    class="white-space-nowrap"
    rounded
    value="Rejected"
  ></Tag>
  <Tag
    v-else-if="status == MemberLoanStatus.RELEASED"
    severity="info"
    rounded
    class="white-space-nowrap"
    icon="pi pi-send"
    value="Released"
  ></Tag>
  <Tag
    v-else-if="status == MemberLoanStatus.OVERDUE"
    severity="danger"
    rounded
    class="white-space-nowrap"
    icon="pi pi-exclamation-triangle"
    value="Overdue"
  ></Tag>
</template>

<script setup lang="ts">
import { MemberLoanStatus } from '@/constants/ui/members';

interface Props {
  status?: string;
}

defineProps<Props>();
</script>
