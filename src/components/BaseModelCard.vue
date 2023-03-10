<script setup lang="ts">
import type { Model } from "../types";
const props = defineProps({
  model: {
    type: Object as () => Model,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'model-details', params: { id: props.model.id } }">
    <div>
      <div class="group relative">
        <div
          class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
        >
          <img
            :src="props.model.avatar"
            :alt="props.model.name"
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a :href="props.model.href">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ props.model.name }}
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
