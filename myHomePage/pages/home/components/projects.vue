<template>
  <a id="projects"></a>
  <div class="container" id="projects-ref" @mousemove.stop="mouseMoved">
    <ElSkeleton :loading="loading" animated :throttle="500">
      <template #template>
        <ElRow>
          <ElCol
            v-for="i in 6"
            :key="i"
            class="project_loading"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
          >
            <div class="project_card-wrapper">
              <ElCard class="project_card">
                <header>
                  <ElSkeletonItem
                    variant="circle"
                    class="project_circle-loading"
                  ></ElSkeletonItem>
                  <div class="project_title-loading">
                    <ElSkeletonItem
                      v-for="i in 3"
                      variant="text"
                      class="project_title-loadingText"
                    ></ElSkeletonItem>
                  </div>
                </header>
                <ElSkeletonItem
                  variant="text"
                  class="project_text-loading"
                ></ElSkeletonItem>
                <ElSkeletonItem
                  variant="text"
                  class="project_text-loading"
                ></ElSkeletonItem>
              </ElCard>
            </div>
          </ElCol>
        </ElRow>
      </template>
      <template #default>
        <ElRow v-if="limits_exceed" class="project_error">
          请在{{ retry_time }}后重试
        </ElRow>
        <ElRow v-else>
          <ElCol
            v-for="(repo, index) in repoList"
            :key="repo.id"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
          >
            <NuxtLink :to="repo.html_url" target="_blank">
              <div
                class="project_card-wrapper scaleIn"
                style="opacity: 0"
                :style="'--delay: ' + index * 0.5 + 's;'"
              >
                <ElCard class="project_card" shadow="hover">
                  <header>
                    <h2 class="project_title">{{ repo.name }}</h2>
                  </header>
                  <main>
                    <a
                      :href="repo.license?.url ? repo.license?.url : '#'"
                      target="_blank"
                      class="project_license"
                      aria-label="开源协议"
                    >
                      <i class="project_license-icon">
                        <svg
                          aria-hidden="true"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          data-view-component="true"
                        >
                          <path
                            d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </i>
                      <span class="project_license-name">{{
                        repo.license?.name
                      }}</span>
                    </a>
                    <aside class="project_language">
                      <span aria-label="主要语言">{{ repo.language }}</span>
                    </aside>
                  </main>
                </ElCard>
              </div>
            </NuxtLink>
          </ElCol>
        </ElRow>
      </template>
    </ElSkeleton>
    <div class="project_link">
      <span>前往</span>
      <a href="https://github.com/McDj26">
        <ElIcon class="project_link-icon"><ElIconLink /></ElIcon>Github
      </a>
      <span>查看更多项目</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Octokit } from "@octokit/core";

const limits_exceed = ref(false);
const retry_time = ref("00:00:00");

interface Repo {
  id: number;
  html_url: string;
  name: string;
  language?: string | null;
  license?: {
    name?: string | null;
    url?: string | null;
  } | null;
}

const loading = ref(true);
const repoList = ref<Repo[]>([]);
const octokit = new Octokit({
  auth: process.env.REPOLIST_API_TOKEN,
});

interface RequestError {
  response: {
    headers: {
      "x-ratelimit-remaining"?: string;
      "x-ratelimit-reset"?: string;
    };
  };
}

octokit.hook.error("request", (err) => {
  let {
    response: { headers },
  } = err as unknown as RequestError;
  if (
    headers["x-ratelimit-remaining"] &&
    headers["x-ratelimit-remaining"] === "0"
  ) {
    limits_exceed.value = true;
    retry_time.value = new Date(
      parseInt(headers["x-ratelimit-reset"]!) * 1000 - Date.now()
    ).toLocaleTimeString();
  }
});

const firstEnterCallback = (el: string) => {
  if (el === "projects-ref") {
    octokit
      .request("GET /users/{username}/repos", {
        username: "McDj26",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then(({ data: repos }) => {
        loading.value = false;
        if (repos.length > 9) {
          repos = repos.slice(0, 9);
        }
        repoList.value = repos;
        nextTick(() => {
          document.querySelectorAll(".project_card-wrapper").forEach((elem) => {
            GlobalBus.on(
              "projectMouseMoved",
              useBackgroundTrace(elem as HTMLElement)
            );
          });
        });
      });
    GlobalBus.off("firstEnter", firstEnterCallback);
  }
};

const changePageTitle = (el: string) => {
  if (el === "projects-ref") {
    useSeoMeta({
      title: "Dajia - 项目",
    });
  }
};

const mouseMoved = (e: MouseEvent) => {
  GlobalBus.emit("projectMouseMoved", e);
};

onMounted(() => {
  GlobalBus.on("firstEnter", firstEnterCallback);
  GlobalBus.on("onEnter", changePageTitle);
});

onUnmounted(() => {
  GlobalBus.off("firstEnter", firstEnterCallback);
  GlobalBus.off("onEnter", changePageTitle);
  GlobalBus.offAll("projectMouseMoved");
});
</script>

<style lang="scss" scoped>
.container {
  @extend %flex-box;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
  background-color: var(--el-bg-color-page);
  .el-row {
    width: 100%;
    padding: 100px 0 0 0;
  }
}

$loadingSuffix: "-loading";
$descriptionColor: lighten(
  $color: #000,
  $amount: 60,
);
$card-padding: 2px;

.project {
  &_circle#{$loadingSuffix} {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 0 20px 0 0;
  }
  &_title {
    margin-top: 0;
    color: var(--el-color-primary);
    &:hover {
      text-decoration: underline;
    }

    &#{$loadingSuffix} {
      display: inline-block;
      margin: 0;
      height: 100px;
      vertical-align: top;
      width: calc(100% - 120px);
    }
    &#{$loadingSuffix}Text {
      margin-bottom: 20px;
      &:nth-of-type(1) {
        width: 40%;
      }
      &:nth-of-type(2) {
        width: 70%;
        margin-right: 30%;
      }
      &:nth-of-type(3) {
        width: 20%;
      }
    }
  }
  &_text {
    &#{$loadingSuffix} {
      margin-top: 20px;
      &:nth-of-type(1) {
        width: 80%;
      }
      &:nth-of-type(2) {
        width: 90%;
      }
    }
  }
  &_card {
    margin: 0;
    &-wrapper {
      margin: 20px;
      padding: 1px;
      border-radius: 5px;
      background-image: radial-gradient(
        150px 150px at var(--offset-X) var(--offset-Y),
        var(--el-color-primary) 0,
        transparent 100%
      );
    }
  }
  &_license {
    color: $descriptionColor;
    &-name {
      font-size: small;
    }
    &-icon {
      position: relative;
      top: 3px;
    }
  }
  &_language {
    float: right;
    color: $descriptionColor;

    &::after {
      content: "";
      clear: both;
    }
  }
  &_link {
    @extend %flex-box;
    width: 100%;
    height: 100px;
    min-height: 100px;
    color: $descriptionColor;
    background-color: var(--el-bg-color);
    a {
      color: var(--el-color-primary);
    }
  }
  &_error {
    justify-content: center;
    height: 100px;
  }
}

@keyframes scaleInAnimation {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  80% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.scaleIn {
  animation: scaleInAnimation 1s var(--delay) forwards;
}
</style>
