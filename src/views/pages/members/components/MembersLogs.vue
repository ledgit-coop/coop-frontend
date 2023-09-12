<template>
  <PageContentHeader
    title="Member Logs"
    size="h5"
  />
  <Chatter :global-history="true" />
</template>
<script setup lang="ts">
import Chatter from '@/components/Chatter.vue';
import PageContentHeader from '@/components/PageContentHeader.vue';
</script>
