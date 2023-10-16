<template>
  <div class="mb-3 flex gap-3 align-items-center">
    <h1
      v-if="size === 'h1'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span>
      {{ title }}
    </h1>
    <h2
      v-else-if="size === 'h2'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span
      >{{ title }}
    </h2>
    <h3
      v-else-if="size === 'h3'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span
      >{{ title }}
    </h3>
    <h4
      v-else-if="size === 'h4'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span
      >{{ title }}
    </h4>
    <h5
      v-else-if="size === 'h5'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span
      >{{ title }}
    </h5>
    <h6
      v-else-if="size === 'h6'"
      class="m-0"
    >
      <span
        v-if="icon"
        :class="icon"
        class="mr-2"
      ></span
      >{{ title }}
    </h6>

    <div class="ml-auto grid gap-2 m-0">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: any;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Header',
  size: 'h4',
});
</script>
