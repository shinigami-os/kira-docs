<script setup lang="ts">
// The page's number, after its title, as the settings app shows "Displays 04".
import { computed, nextTick, onMounted, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import { numberedPages, pageLink } from '../pages';

const { theme, page } = useData();
const route = useRoute();

const n = computed(() => numberedPages(theme.value.sidebar).find((p) => p.link === pageLink(page.value.relativePath))?.n ?? '');

function mark() {
  nextTick(() => {
    const h1 = document.querySelector('.vp-doc h1');
    if (h1) h1.setAttribute('data-n', n.value);
  });
}

onMounted(mark);
watch(() => route.path, mark);
</script>

<template>
  <span hidden />
</template>
