<script setup lang="ts">
import type { Players } from '~/types/Player';

defineProps<{
  players: Players;
}>();

defineEmits<{
  (e: 'toggleActivePlayer'): void;
}>();
</script>

<template>
  <div class="grid max-h-dvh grid-flow-col grid-cols-2 grid-rows-[auto_1fr] gap-0.5 bg-white">
    <template v-for="player in players" :key="player.id">
      <div
        class="p-4 bg-[var(--ui-bg)] flex flex-row justify-between items-center gap-2"
        :class="{ 'bg-yellow-600/75': player.isActive }"
        @click="$emit('toggleActivePlayer')"
      >
        <h2 class="text-center text-3xl">
          {{ player.name }}
        </h2>
        <span v-show="player.isActive">♦︎</span>
      </div>

      <ul class="text-center p-4overflow-scroll bg-[var(--ui-bg)]">
        <li
          v-for="(value, idx) in player.loreLog.toReversed()"
          :key="`${player.id}-${idx}`"
          class="decoration-red-500/80 not-first:line-through first:text-6xl"
        >
          {{ value }}
        </li>
      </ul>
    </template>
  </div>
</template>
