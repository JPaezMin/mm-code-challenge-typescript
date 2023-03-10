<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModelsService from "@/services/ModelsService.js";
import type { Model } from "../types";
const model = ref<Model | null>(null);
const props = defineProps({
  id: {
    type: Number,
    required: true,
    readonly: true
  }
})
const saveModel: () => Promise<void> = async () => {
  if (model.value) {
    try {
      await ModelsService.updateModel(model.value);
    } catch (error) {
      console.log(error);
    }
  }
};
onMounted(() => {
  ModelsService.fetchModel(props.id)
    .then((response) => {
      model.value = response.data as Model;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
<template>
  <div v-if="model">
    <h2
      class="text-2xl font-bold tracking-tight text-gray-900 mt-16 text-center"
    >
      <input
        v-model="model.name"
        @change="saveModel"
        class="border-2 border-gray-300 px-4 py-2 focus:outline-none focus:bg-gray-100"
      />
    </h2>
    <div
      class="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 w-full object-cover md:w-48"
            :src="model.avatar"
            alt="model.avatar"
          />
        </div>
        <div class="p-8">
          <label
            class="block uppercase tracking-wide text-xs font-bold mb-2 text-gray-700"
            for="model-id"
          >
            Model ID
          </label>
          <div class="text-indigo-500 text-sm font-semibold" id="model-id">
            {{ model.id }}
          </div>
          <p class="mt-2 text-gray-500">
            {{ model.age }} | {{ model.gender }} | {{ model.eyes }}
          </p>
          <p class="mt-2 text-gray-500">{{ model.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


