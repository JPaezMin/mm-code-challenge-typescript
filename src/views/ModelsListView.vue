<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Model } from "../types";
import ModelsService from "@/services/ModelsService.js";
import BaseModelCard from "@/components/BaseModelCard.vue";
import ThePagination from "@/components/ThePagination.vue";
import BaseModelSort from "@/components/BaseModelSort.vue";
const isLoading = ref(false);
const pageNumber = ref<number>(1);
const currentSort = ref<string>("name");
const currentSortDir = ref<string>("asc");
const models = ref<[]>([]);
const itemsPerPage = ref<number>(20);
const modelsLength = ref<number>(0);
const dataLoadedPerPage = ref<Model[]>([]);
const currentPage = ref<number>(1);
const searchQuery = ref<string>("");
const totalNumberOfPages = () : number => {
  return Math.ceil(filteredModels.value.length / itemsPerPage.value);
};
const getDataPerPage = computed<Model[]>(() => {
  currentPage.value = pageNumber.value;
  dataLoadedPerPage.value = [];
  const start = (pageNumber.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedAndFilteredModels.value.slice(start, end);
});
const filteredModels = computed<Model[]>(() => {
  if (!models.value || !models.value.length) {
    return [];
  }
  return models.value.filter((model: Model) => {
    return model.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
const sortedAndFilteredModels = computed<Model[]>(() => {
  const filtered = filteredModels.value;
  return filtered.sort((a, b) => {
    let modifier = 1;
    if (currentSortDir.value === "desc") modifier = -1;
    if (a[currentSort.value as keyof Model] < b[currentSort.value as keyof Model]) return -1 * modifier;
    if (a[currentSort.value as keyof Model] > b[currentSort.value as keyof Model]) return 1 * modifier;
    return 0;
  });
});
const updateSortingDirection = (newSortingDirection: string): void => {
  currentSortDir.value = newSortingDirection;
};
const updateDataLoadedPerPage = (page: number): void => {
  pageNumber.value = page;
};
const updatePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  pageNumber.value = currentPage.value;
};
const updateNextPage = () => {
  if (currentPage.value < totalNumberOfPages()) {
    currentPage.value++;
  }
  pageNumber.value = currentPage.value;
};
async function fetchData() {
  isLoading.value = true;
  try {
    const response = await ModelsService.fetchModels();
    models.value = response.data;
    modelsLength.value = models.value.length;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
onMounted(fetchData);
</script>
<template>
  <div class="container mx-auto" v-if="models">
    <p
      v-if="isLoading"
      class="text-center text-2xl font-bold tracking-tight text-gray-900 mt-8"
    >
      Loading...
    </p>
    <div if="models">
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 mt-8 text-center"
      >
        Our Models
      </h2>
      <div class="flex justify-center mt-12">
        <ThePagination
          @update-data-per-page="updateDataLoadedPerPage"
          @update-previous-page="updatePreviousPage"
          @update-next-page="updateNextPage"
          :totalNumberOfPages="totalNumberOfPages"
          :getDataPerPage="getDataPerPage"
          :currentPage="currentPage"
        />
      </div>
      <div class="flex justify-center mt-12">
        <BaseModelSort
          :currentSortDir="currentSortDir"
          @update-sorting-direction="updateSortingDirection"
          v-if="dataLoadedPerPage"
        />
      </div>
      <section id="Filter" class="flex justify-center mt-12">
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 text-center"
            >Filter Model By Name:</label
          >
          <input
            placeholder="Search by Model Name"
            type="text"
            id="small-input"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
            v-model="searchQuery"
          />
        </div>
      </section>
      <div class="bg-white">
        <div
          class="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div
            class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            <BaseModelCard
              v-for="model in getDataPerPage"
              :key="model.id"
              :model="model"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
