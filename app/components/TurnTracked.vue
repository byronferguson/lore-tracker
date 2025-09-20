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
  <div
    class="grid max-h-dvh grid-flow-col grid-cols-2 grid-rows-[auto_1fr] gap-0.5 bg-[var(--ui-text)]"
  >
    <template v-for="player in players" :key="player.id">
      <div
        class="p-4 bg-[var(--ui-bg)] flex flex-row justify-between items-center gap-2"
        :class="{
          'bg-amber': player.isActive,
        }"
        @click="$emit('toggleActivePlayer')"
      >
        <h2 class="text-center text-3xl">
          {{ player.name }}
        </h2>
        <span v-show="player.isActive">♦︎</span>
      </div>

      <div class="p-4 overflow-scroll bg-[var(--ui-bg)]">
        <h3 class="text-6xl text-center mb-2">{{ player.lore }}</h3>

        <article class="text-center">
          <p class="text-sm">Pending</p>
          <p v-if="player.currentTurn.log.length === 0" class="text-sm">&mdash;</p>
          <ul v-else>
            <li
              v-for="(lore, idx) in player.currentTurn.log.toReversed()"
              :key="`${player.id}-${player.currentTurn.turnNumber}-${idx}`"
            >
              {{ lore.loreChange > 0 ? '+' : '' }}{{ lore.loreChange }}
            </li>
          </ul>
        </article>

        <section
          v-for="(turn, turnIdx) in player.turns.toReversed()"
          :key="`${player.id}-turn-${turnIdx}`"
          class="text-center"
        >
          <p class="text-sm">Turn {{ turn.turnNumber }}</p>
          <p v-if="turn.log.length === 0" class="text-sm">&mdash;</p>
          <ul v-else>
            <li
              v-for="(lore, idx) in turn.log.toReversed()"
              :key="`${player.id}-${turn.turnNumber}-${idx}`"
            >
              {{ lore.loreChange > 0 ? '+' : '' }}{{ lore.loreChange }}
            </li>
          </ul>
        </section>
      </div>
    </template>
  </div>
</template>
