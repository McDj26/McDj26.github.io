<template>
  <div class="container" id="about-ref">
    <a id="about"></a>
    <ElRow class="about">
      <ElCol :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="about_avatar">
        <div class="about_avatar-clip">
          <img src="/images/avatar-480-640.webp" alt="半身照" />
        </div>
        <div class="about_avatar-info">
          <h2>Dajia Chen</h2>
          <p>前端开发工程师</p>
          <p>生日: 2003.01.09</p>
        </div>
      </ElCol>
      <ElCol :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="about_info">
        <ElCard shadow="hover">
          <template #header aria-label="教育背景">
            <h2>教育背景</h2>
          </template>
          <aside>2021.09 - 2025.07</aside>
          <p>中山大学 | 软件工程 | 本科</p>
          <p>获2021-2022年本科生奖学金</p>
        </ElCard>
        <ElCard shadow="hover" aria-label="自我介绍">
          <template #header>
            <h2>自我介绍</h2>
          </template>
          <p>
            本人来自中山大学软件工程专业，对计算机科学和技术充满热情，热爱前端开发工作。掌握了扎实的HTML、CSS和JavaScript基础知识，并能够熟练运用Vue.js、Nuxt.js，以下是本人的性格优势：
            <br /><br />
            <em>注重实践与经验积累：</em
            >曾两度在实训课中担任前端开发工程师，熟练使用Element
            Plus、Echarts等前端组件库，习惯将学到的知识记录在博客中进行分享。
            <br />
            <em>注重团队协作和沟通：</em
            >熟悉前端开发中的协作和沟通技巧，能够熟练运用Git等版本控制工具。
            <br />
            <em>虚心好学和耐心钻研：</em
            >能够自主学习并掌握前端开发中的各种技术和框架，并针对开发过程中遇到的问题，通过查看文档、社区求助、提出猜想并通过代码进行验证。
          </p>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import { GlobalBus } from "~/composables/useBus";

const firstEnterCallback = (id: string) => {
  if (id === "about-ref") {
    document.querySelectorAll(".about_info .el-card").forEach((elem) => {
      elem.classList.add("active");
    });
    GlobalBus.off("firstEnter", firstEnterCallback);
  }
};

const changePageTitle = (el: string) => {
  if (el === "about-ref") {
    useSeoMeta({
      title: "Dajia - 关于",
    });
  }
};

onMounted(() => {
  GlobalBus.on("firstEnter", firstEnterCallback);
  GlobalBus.on("onEnter", changePageTitle);
});

onUnmounted(() => {
  GlobalBus.off("firstEnter", firstEnterCallback);
  GlobalBus.off("onEnter", changePageTitle);
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--el-bg-color-page);
}
.about {
  min-height: 100vh;
  &_avatar {
    @extend %flex-box;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 300px;
    background-color: rgb(44, 122, 214);
    overflow: hidden;
    &-clip {
      width: 240px;
      height: 240px;
      margin-top: 100px;
      overflow: hidden;
      border-radius: 500px;
      img {
        position: relative;
        top: -20px;
        width: 240px;
      }
    }
    &-info {
      text-align: center;
      h2 {
        font-weight: normal;
      }
      p {
        font-weight: lighter;
      }
    }
  }
  &_info {
    padding: 100px 20px 0;
    p {
      font-weight: lighter;
      padding: 0 20px;
    }
    aside {
      display: inline;
      float: right;

      font-weight: lighter;
      padding-right: 20px;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
    h2 {
      margin-left: 20px;
      font-weight: normal;
    }
    .el-card {
      --el-card-padding: 0px;
      opacity: 0;
    }
    .el-card + .el-card {
      margin-top: 20px;
    }
    @for $index from 1 through 2 {
      .el-card:nth-of-type(#{$index}) {
        animation: fadeInRight 0.5s 0.5s * $index ease-out paused forwards;
      }
      .el-card:nth-last-of-type(#{$index}).active {
        animation-play-state: running;
      }
    }

    em {
      font-style: normal;
      font-weight: bold;
      margin-left: 2em;
    }
    em::before {
      content: "- ";
    }
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 768px) {
  .about {
    &_avatar {
      max-width: none;
    }
    &_info {
      padding: 20px 20px;
    }
  }
}
</style>
