<template>
  <div class="container" id="board-ref">
    <a id="top"></a>
    <div class="introduce">
      <h1 class="introduce_name">Dajia Chen</h1>
      <h2 ref="motto_ref" class="introduce_motto" v-show="displayMotto">
        {{ "Link to the past\nBuild the future" }}
      </h2>
      <ClientOnly>
        <nav>
          <ul class="introduce_nav">
            <li>
              <NuxtLink to="mailto:2645370670@qq.com">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                    />
                  </svg>
                </i>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/home#blogs">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.5 10H10c-.55 0-1-.45-1-1s.45-1 1-1h2.5c.55 0 1 .45 1 1s-.45 1-1 1m2.5 4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1m7-10v16c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V4c0-1.11.89-2 2-2h16c1.11 0 2 .89 2 2m-4 8s0-1-1-1c-.95.03-1-1-1-1V8c0-1.66-1.34-3-3-3H9C7.34 5 6 6.34 6 8v7c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3v-3z"
                      fill="currentColor"
                    />
                  </svg>
                </i>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://github.com/McDj26">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4.44c-.32-.07-.33-.68-.33-.89l.01-2.47c0-.84-.29-1.39-.61-1.67c2.01-.22 4.11-.97 4.11-4.44c0-.98-.35-1.79-.92-2.42c.09-.22.4-1.14-.09-2.38c0 0-.76-.23-2.48.93c-.72-.2-1.48-.3-2.25-.31c-.76.01-1.54.11-2.25.31c-1.72-1.16-2.48-.93-2.48-.93c-.49 1.24-.18 2.16-.09 2.38c-.57.63-.92 1.44-.92 2.42c0 3.47 2.1 4.22 4.1 4.47c-.26.2-.49.6-.57 1.18c-.52.23-1.82.63-2.62-.75c0 0-.48-.86-1.38-.93c0 0-.88 0-.06.55c0 0 .59.28 1 1.32c0 0 .52 1.75 3.03 1.21l.01 1.53c0 .21-.02.82-.34.89H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                      fill="currentColor"
                    />
                  </svg>
                </i>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </ClientOnly>
    </div>
    <ClientOnly>
      <div class="arrow-down">
        <i>
          <svg viewBox="0 0 24 24">
            <path
              d="M2 4L12 9L22 4M2 10L12 15L22 10"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            />
          </svg>
        </i>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
/*
  对于需要通过ref获取的组件元素
  不能在用<ClientOnly></ClientOnly>将其包裹的同时，在setup的onMounted中对其进行操作
  因为onMounted钩子在组件挂载时会被调用，此时组件内的<ClientOnly></ClientOnly>的内容还没有被渲染
  因此在onMounted钩子中无法获取到组件内的<ClientOnly></ClientOnly>中的DOM元素
  ! 因此不推荐对非组件元素使用<ClientOnly></ClientOnly>，除非非常确定不会用到<ClientOnly></ClientOnly>中的DOM元素
*/
const motto_ref = ref();
const displayMotto = ref(false);

const firstEnterCallback = (id: string) => {
  if (id === "board-ref") {
    displayMotto.value = true;
    useTypeWritterEffect(motto_ref.value, 150, 500, () => {
      setTimeout(() => {
        motto_ref.value.classList.add("introduce_motto-deactive");
      }, 2000);
    });
    GlobalBus.off("firstEnter", firstEnterCallback);
  }
};

const changePageTitle = (el: string) => {
  if (el === "board-ref") {
    useSeoMeta({
      title: "Dajia - 主页",
    });
  }
};

onMounted(() => {
  // 如果给h2包裹了<ClientOnly></ClientOnly>，这里将会输出undefined
  // console.log(motto_ref.value);
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
  position: relative;
  margin: 0 auto;
  height: 100vh;
  min-height: 600px;
}

@keyframes cursorAnimation {
  0% {
    border-right: 1px solid var(--el-text-color-primary);
  }
  50% {
    border-right: none;
  }
  100% {
    border-right: 1px solid var(--el-text-color-primary);
  }
}

.introduce {
  @extend %flex-box;
  flex-direction: column;
  height: 100vh;

  &_name {
    font-size: 72px;
    font-weight: normal;
    margin-bottom: 0;
  }
  &_motto {
    font-size: 36px;
    font-weight: lighter;
    max-width: 330px;
    white-space: break-spaces;
    text-align: center;

    &::after {
      content: "";
      animation: cursorAnimation 1s infinite;
    }
    &-deactive::after {
      animation: none;
    }
  }
  &_nav {
    @extend %flex-box, %list-normal;
    justify-content: center;
    margin-top: 20px;
    li + li {
      margin-left: 20px;
    }
    li {
      width: 30px;
      height: 30px;
    }
  }
}

@keyframes movedownAnimation {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}

.arrow-down {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  animation: movedownAnimation 2s infinite;
}
</style>
