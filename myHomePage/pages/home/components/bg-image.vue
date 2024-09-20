<template>
  <img :src="imageSource" alt="背景" @error="loadFailed" />
</template>

<script setup lang="ts">
const color = useColorMode();
const colorMode = computed(() => (color.value === "dark" ? "night" : "day"));

const imageSize = ref("");
const imageSource = computed(
  () => `/images/${colorMode.value}-${imageSize.value}`
);

const imageResolver: { [key: string]: number[] } = {
  "1": [1280, 1920, 2560, 3840],
  "1.25": [1024, 1536, 2048, 3072],
  "1.5": [853, 1280, 1706, 2560],
  "2": [640, 960, 1280, 1920],
};
const imageHeights = [720, 1080, 1440, 2160];

const imageSelector = () => {
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio;

  let solver_key = 1;
  Object.keys(imageResolver).forEach((key) => {
    const current_key = Number(key);
    if (dpr >= current_key) {
      solver_key = Math.max(solver_key, current_key);
    }
  });

  let image_index = 0;
  imageResolver[solver_key.toString()]!.forEach((item, index) => {
    if (item <= width) {
      image_index = index;
    }
  });

  return `${imageResolver["1"][image_index]}-${imageHeights[image_index]}.webp`;
};

let initial_width = 0;
const selectImageSrc = () => {
  if (window.innerWidth > initial_width) {
    imageSize.value = imageSelector();
    initial_width = window.innerWidth;
  }
};

const loadFailed = () => {
  imageSize.value = "1920-1080.jpg";
};

onMounted(() => {
  window.addEventListener("resize", selectImageSrc);
});
onUnmounted(() => {
  window.removeEventListener("resize", selectImageSrc);
});

onBeforeMount(selectImageSrc);
</script>

<style lang="scss" scoped>
img {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
