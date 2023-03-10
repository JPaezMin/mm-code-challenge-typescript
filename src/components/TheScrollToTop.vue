<script setup lang="ts">
import { ref, onMounted } from "vue";

const scrollRef = ref<Window | null>(null);

const scrollToTop = () => {
  scrollRef.value?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  scrollRef.value = window;
});
</script>
<template>
  <div class="fixed bottom-4 right-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-8 h-8 p-2 rounded-full shadow-lg bg-red-500 text-white transform cursor-pointer"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      @click="scrollToTop"
    >
      <path fill="white" d="M12 3L2 12h5v8h10v-8h5L12 3z" />
    </svg>
  </div>
</template>


