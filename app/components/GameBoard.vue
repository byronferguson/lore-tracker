<script setup lang="ts">
import type { Game } from '~/types/Game';

defineProps<{
  game: Game;
}>();

defineEmits<{
  (e: 'toggleActivePlayer'): void;
}>();
</script>

<template>
  <section class="grid game-board grid-cols-2 grid-rows-[auto_auto_1fr] gap-0.5 bg-[var(--ui-text)]">
    <h2 class="text-center text-3xl bg-[var(--ui-bg)] p-2">{{ game.player1Name }}</h2>
    <h2 class="text-center text-3xl bg-[var(--ui-bg)] p-2">{{ game.player2Name }}</h2>

    <h3 class="text-6xl text-center bg-[var(--ui-bg)] py-4 font-black">{{ game.player1Lore}}</h3>
    <h3 class="text-6xl text-center bg-[var(--ui-bg)] py-4 font-black">{{ game.player2Lore }}</h3>

    <div class="col-span-2 bg-[var(--ui-bg)] overflow-scroll">
      <section
    class="grid grid-cols-[1fr_3ch_1fr] gap-0.5 col-span-2 bg-[var(--ui-text-muted)]  text-muted "
  >
    <div class="bg-[var(--ui-bg)] uppercase text-toned text-sm text-center">
      <span v-show="game.isActive">♦︎</span>
    </div>
    <div class="bg-[var(--ui-bg)] uppercase text-toned text-sm text-center -mx-4">turns</div>
    <div class="bg-[var(--ui-bg)] uppercase text-toned text-sm text-center">
      <span v-show="!game.isActive">♦︎</span>
    </div>

    <template v-for="(turn, index) in game.turns" :key="`turn-${index}`">
      <div class="bg-[var(--ui-bg)] text-center p-2 content-center">
        <article v-if="!turn.log.some(({ playerId }) => playerId === 1)">
          &mdash;
        </article>
        <article v-else v-for="(entry, loreIndex) in turn.log.filter(({ playerId }) => playerId === 1)" :key="`turn-${index}-player1-lore-${loreIndex}`">
          {{ entry.lore > 0 ? '+' : '' }}{{ entry.lore }}
          <span class="text-xs italic">({{ entry.loreTotal }})</span>
        </article>
      </div>

      <div class="bg-[var(--ui-bg)] text-center p-2 content-center">
        {{ game.turns.length - index }}
      </div>

      <div class="bg-[var(--ui-bg)] text-center p-2 content-center">
        <article v-if="!turn.log.some(({ playerId }) => playerId === 2)">
          &mdash;
        </article>
        <article v-else v-for="(entry, loreIndex) in turn.log.filter(({ playerId }) => playerId === 2)" :key="`turn-${index}-player2-lore-${loreIndex}`">
          {{ entry.lore > 0 ? '+' : '' }}{{ entry.lore }}
          <span class="text-xs italic">({{ entry.loreTotal }})</span>
        </article>
      </div>
    </template>

  </section>

    </div>


  </section>

</template>
