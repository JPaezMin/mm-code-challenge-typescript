<script setup lang="ts">
const emits = defineEmits(["update-sorting-direction"]);
const updateSortedDir = (newSortDir: String) => {
  emits("update-sorting-direction", newSortDir);
};
</script>
<template>
  <div class="flex">
    <button
      @click="() => updateSortedDir('asc')"
      class="bg-gray-800 hover:bg-gray-400 text-white py-2 px-2 rounded-md"
    >
      Sort Ascending
    </button>
    <button
      @click="() => updateSortedDir('desc')"
      class="bg-gray-800 hover:bg-gray-400 text-white py-2 px-2 ml-4 rounded-md"
    >
      Sort Descending
    </button>
  </div>
</template>




