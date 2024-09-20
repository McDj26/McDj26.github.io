<template>
  <a id="blogs"></a>
  <div class="container" id="blogs-ref">
    <ElRow>
      <ElCol v-for="i in 1" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="blog_card-wrapper">
          <NuxtLink to="https://juejin.cn/user/1304473557534952">
            <div class="blog_card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 28"
                fill="none"
                class="blog_logo"
              >
                <path
                  d="M17.5865 17.3955H17.5902L28.5163 8.77432L25.5528 6.39453L17.5902 12.6808H17.5865L17.5828 12.6845L9.62018 6.40201L6.6604 8.78181L17.5828 17.3992L17.5865 17.3955Z"
                  fill="#1E80FF"
                />
                <path
                  d="M17.5872 6.77268L21.823 3.40505L17.5872 0.00748237L17.5835 0L13.3552 3.39757L17.5835 6.76894L17.5872 6.77268Z"
                  fill="#1E80FF"
                />
                <path
                  d="M17.5865 23.2854L17.5828 23.2891L2.95977 11.7531L0 14.1291L0.284376 14.3574L17.5865 28L28.5238 19.3752L35.1768 14.1254L32.2133 11.7456L17.5865 23.2854Z"
                  fill="#1E80FF"
                />
              </svg>
              <h2>掘金</h2>
            </div>
          </NuxtLink>
          <div class="blog_card-mask"></div>
        </div>
      </ElCol>
    </ElRow>
    <div class="blog_info">
      <span>更多精彩还在路上 ~</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const changePageTitle = (el: string) => {
  if (el === "blogs-ref") {
    useSeoMeta({
      title: "Dajia - 博客",
    });
  }
};

onMounted(() => {
  GlobalBus.on("onEnter", changePageTitle);
});

onUnmounted(() => {
  GlobalBus.off("onEnter", changePageTitle);
});
</script>

<style lang="scss" scoped>
.container {
  @extend %flex-box;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: var(--el-bg-color-page);
  padding: 0;
  .el-row {
    padding-top: 80px;
    width: 100%;
    flex-grow: 1;
  }
}

.blog {
  &_card {
    @extend %flex-box;
    position: relative;
    flex-direction: column;
    margin: 0;
    height: 100%;

    text-align: center;
    &-wrapper {
      @extend %box;
      position: relative;
      padding: 20px;
      z-index: 1;
    }

    &-mask {
      width: 0;
      height: 0;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
    &-wrapper:hover &-mask {
      width: 100%;
      height: 100%;
    }
  }
  &_logo {
    width: 100px;
    height: 100px;
  }
  &_info {
    @extend %flex-box;
    height: 100px;
    min-height: 100px;
    background-color: var(--el-bg-color);
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .blog_card-wrapper:hover .blog_card-mask {
    background-image: radial-gradient(
      600px 70px at center,
      #00a7f66e 0,
      transparent 100%
    );
    mask-image: linear-gradient(
      90deg,
      transparent 0%,
      black 50%,
      transparent 100%
    );
  }
}

@media screen and (min-width: 768px) {
  .el-row {
    justify-content: space-around;
    & > * {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      .blog_card-wrapper {
        height: 80%;
      }
    }
  }

  .blog_card-wrapper:hover .blog_card-mask {
    background-image: radial-gradient(
      70px 600px at center,
      #00a7f66e 0,
      transparent 100%
    );
    mask-image: linear-gradient(
      0deg,
      transparent 0%,
      black 50%,
      transparent 100%
    );
  }
}
</style>
