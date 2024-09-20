<template>
  <div class="home" ref="homeRef">
    <ClientOnly> <BgImage></BgImage></ClientOnly>
    <Board></Board>
    <About></About>
    <Projects></Projects>
    <Blogs></Blogs>
    <Skills></Skills>
  </div>
</template>

<script setup lang="ts">
import Board from "./components/board.vue";
import BgImage from "./components/bg-image.vue";
import About from "./components/about.vue";
import Blogs from "./components/blogs.vue";
import Projects from "./components/projects.vue";
import Skills from "./components/skills.vue";
import { GlobalBus } from "~/composables/useBus";

let homeRef = ref<HTMLDivElement>();
let boardRef: Element | null;
let headerRef: Element | null;

useSeoMeta({
  title: "Dajia",
});

// #region header背景变化控制
const transferHeaderBackground = () => {
  const { bottom } = boardRef!.getBoundingClientRect();
  if (headerRef) {
    if (bottom < 80) {
      headerRef.classList.add("header-solid");
    } else {
      headerRef.classList.remove("header-solid");
    }
  }
};
// #endregion

// #region 页面段落式滚动控制
let pageSectionCancleToken: (() => void) | undefined;
onMounted(() => {
  boardRef = document.querySelector("#board-ref");
  headerRef = document.querySelector("#header-ref");

  window.addEventListener("scroll", transferHeaderBackground);
  transferHeaderBackground();

  const pages = [];
  for (let elem = boardRef; elem; elem = elem.nextElementSibling) {
    if (elem.id && elem instanceof HTMLDivElement) {
      pages.push({
        el: elem,
        enterCallback: (el: Element) => GlobalBus.emit("onEnter", el.id),
        firstEnterCallback: (el: Element) =>
          GlobalBus.emit("firstEnter", el.id),
      });
    }
  }
  pageSectionCancleToken = useSection(pages);
});

onUnmounted(() => {
  window.removeEventListener("scroll", transferHeaderBackground);

  if (pageSectionCancleToken) {
    pageSectionCancleToken();
  }
});
// #endregion
</script>

<style scoped></style>
