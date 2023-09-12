<template>
  <div class="flex flex-column">
    <Textarea
      rows="5"
      cols="30"
    />

    <div class="flex pt-4">
      <Button
        class="ml-auto"
        label="Submit"
      />
    </div>
  </div>

  <div
    v-if="!globalHistory"
    class="flex flex-column"
  >
    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>The borower is not paying.</div>
    </div>

    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>The borower said it will be late.</div>
    </div>

    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>Moving to collections.</div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-column"
  >
    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Logged from Emegency Loan</small>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>The borower is not paying.</div>
    </div>

    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Logged from Personal Loan</small>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>The borower said it will be late.</div>
    </div>

    <div class="flex gap-4 align-items-center p-2">
      <div class="flex flex-column">
        <span>Kevin Loquencio</span>
        <small>Sept 2, 2023 03:00 AM</small>
      </div>

      <div>Member asked to put the dividen in the share capital.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
interface Props {
  globalHistory?: boolean;
}

defineProps<Props>();
</script>
