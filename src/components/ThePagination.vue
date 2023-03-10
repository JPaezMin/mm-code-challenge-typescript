<script setup lang="ts">
const emits = defineEmits([
  "update-data-per-page",
  "update-previous-page",
  "update-next-page",
]);
const props = defineProps<{
  currentPage: Number
  totalNumberOfPages: Function
}>()
const isCurrentPage = (page: number) => {
  return page === props.currentPage ? "active" : "";
};
const updateDataPerPage = (page: number) => {
  emits("update-data-per-page", page);
};
const getPreviousPage = () => {
  emits("update-previous-page");
};
const getNextPage = () => {
  emits("update-next-page");
};
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex items-center -space-x-px">
      <li>
        <a
          @click.prevent="getPreviousPage()"
          class="cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Previous</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
      <li
        v-for="page in totalNumberOfPages()"
        :key="page"
        @click.prevent="updateDataPerPage(page)"
      >
        <a
          href="#"
          :class="isCurrentPage(page)"
          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          @click.prevent="getNextPage()"
          class="cursor-pointer block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Next</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.active {
  @apply z-10 px-3 py-2 leading-tight text-white border border-red-500 bg-red-700 hover:bg-red-600 hover:text-white;
}
</style>
