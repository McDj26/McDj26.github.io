<template>
  <ElHeader class="header" id="header-ref">
    <h1 class="header_title">{{ "<Dajia />" }}</h1>
    <aside class="header_aside">
      <ClientOnly>
        <AlgoliaDocSearch placeholder="搜索" :translations="translations" />
        <ElButton circle link @click="colorMode = true" aria-label="切换主题">
          <ElIcon>
            <ElIconMoon v-if="colorMode" class="header_aside-moon" />
            <ElIconSunny v-else class="header_aside-sunny" />
          </ElIcon>
        </ElButton>
      </ClientOnly>
      <!-- <ElButton circle link aria-label="切换语言">
        <i>
          <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
          >
            <path
              fill="currentColor"
              d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"
            ></path>
          </svg>
        </i>
      </ElButton> -->
      <nav>
        <ElMenu mode="horizontal" :ellipsis="false" class="header_nav">
          <ElMenuItem>
            <NuxtLink to="/home#about"><span>关于</span></NuxtLink>
          </ElMenuItem>
          <ElMenuItem>
            <NuxtLink to="/home#projects"><span>项目</span></NuxtLink>
          </ElMenuItem>
          <ElMenuItem>
            <NuxtLink to="/home#blogs"><span>博客</span></NuxtLink>
          </ElMenuItem>
          <ElMenuItem>
            <NuxtLink to="/home#skills"><span>技能</span></NuxtLink>
          </ElMenuItem>
        </ElMenu>
      </nav>
    </aside>
  </ElHeader>
  <slot></slot>
</template>

<script setup lang="ts">
import { translations } from "~/assets/i18n/algoliaSearch";

const color = useColorMode();
const colorMode = computed({
  get: () => color.value === "dark",
  set: () => {
    color.preference = color.value === "dark" ? "light" : "dark";
    if (import.meta.client) {
      document.documentElement.dataset.theme =
        color.value === "dark" ? "light" : "dark";
    }
  },
});

onMounted(() => {
  if (colorMode.value) {
    document.documentElement.dataset.theme = "dark";
  }
});
</script>

<style lang="scss" scoped>
@import url(./default.scss);
</style>
