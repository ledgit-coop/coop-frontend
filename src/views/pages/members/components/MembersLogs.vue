<template>
  <PageContentHeader
    title="Member Logs"
    size="h5"
  />
  <Chatter
    :module-id="member?.id"
    :module="LogModules.MEMBER"
    :global-history="true"
  />
</template>
<script setup lang="ts">
import Chatter from '@/components/Chatter.vue';
import PageContentHeader from '@/components/PageContentHeader.vue';
import { LogModules } from '@/constants/ui/logs';
import type { Member } from '@/types/ui/members';

interface Props {
  member?: Member;
}

defineProps<Props>();
</script>
