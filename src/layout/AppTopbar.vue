<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import Menu from 'primevue/menu';
import AuthService from '@/service/AuthService';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref<any>();
const topbarMenuActive = ref(false);
const router = useRouter();
const menu = ref();

const items = ref([
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    command: () => {},
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
    command: () => {},
  },
  {
    label: 'Sign out',

    icon: 'pi pi-sign-out',
    command: () => {
      AuthService.logout(true);
    },
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: any) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event: any) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-topbar">
    <router-link
      to="/"
      class="layout-topbar-logo"
    >
      <img
        :src="logoUrl"
        alt="logo"
      />
      <span>DSPACC</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div
      class="layout-topbar-menu"
      :class="topbarMenuClasses"
    >
      <button
        class="p-link layout-topbar-button"
        @click="toggle"
      >
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>

      <Menu
        id="overlay_menu"
        ref="menu"
        :model="items"
        :popup="true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
