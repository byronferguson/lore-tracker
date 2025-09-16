<script setup lang="ts">
import type { Players } from '~/types/Player';

defineProps<{
  players: Players;
}>();
</script>

<template>
  <div class="grid max-h-dvh grid-flow-col grid-cols-2 grid-rows-[auto_1fr] gap-0.5">
    <template v-for="player in players" :key="player.id">
      <h2
        class="p-4 text-center text-3xl border-b-2 first:border-r-2 light:border-gray-900 dark:border-gray-200"
      >
        {{ player.name }}
      </h2>

      <ul
        class="text-center p-4 light:border-gray-900 dark:border-gray-200 not-last:border-r-2 overflow-scroll"
      >
        <li
          v-for="(value, idx) in [...player.loreLog].reverse()"
          :key="`${player.id}-${idx}`"
          class="decoration-red-500/80 not-first:line-through first:text-6xl"
        >
          {{ value }}
        </li>
      </ul>
    </template>
  </div>
</template>
