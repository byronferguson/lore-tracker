<script setup lang="ts">
import type { Game } from '~/types/Game';

function resetGame() {
return {
  player1Name: 'Me',
  player2Name: 'You',
  player1Lore: 0,
  player2Lore: 0,
  isActive: true,
  turns: [{
    player1: { loreTotal: 0, loreChange: 0, log: [] },
    player2: { loreTotal: 0, loreChange: 0, log: [] },
  }],
};
}

function newGame() {
  game.value = resetGame();
  isNewGameModalOpen.value = false;
}

const isNewGameModalOpen = ref(false);

const game = ref<Game>(resetGame());

function handleLoreChange({ playerId, lore }: { playerId: 1 | 2; lore: number }) {
  const activeTurn = game.value.turns[0];

  if(!activeTurn) return;

  const playerLore = game.value[`player${playerId}Lore`];
  game.value[`player${playerId}Lore`] = Math.max(0, playerLore + lore);

  activeTurn[`player${playerId}`].log.unshift({ loreChange: lore, loreTotal: game.value[`player${playerId}Lore`] });
}

function handleUndo({ playerId }: { playerId: number }) {
  // const player = players.value.find(p => p.id === playerId);
  // if (!player) return;
  // if (player.log.length === 0) return;
  // const lastChange = player.log.pop()!;
  // player.lore = Math.max(0, player.lore - lastChange.loreChange);
}

function newTurn() {
  game.value.isActive = !game.value.isActive;

  // tabulate the end of turn values

  game.value.turns.unshift({
    player1: { loreTotal: 0, loreChange: 0, log: [] },
    player2: { loreTotal: 0, loreChange: 0, log: [] },
  });

}
</script>

<template>
  <main class="flex flex-col" >
    <section class="grid game-board grid-cols-[auto_1fr_auto] gap-2 px-6 text-2xl relative flex-grow">
      <LoreButtons :player-id="1" @change="handleLoreChange" @undo="handleUndo" />
      <GameBoard :game />
      <LoreButtons :player-id="2" @change="handleLoreChange" @undo="handleUndo" />
      <UModal
        v-model:open="isNewGameModalOpen"
        title="Start New Game?"
        description="This will reset all lore counts and logs."
      >
        <UButton class="absolute top-4 left-4" icon="mdi:add" variant="ghost" color="neutral" />
        <template #content>
          <div class="p-4 text-center">
            <p class="mb-4 text-3xl font-bold">Start New Game?</p>
            <p class="mb-8">This will reset all lore counts and logs.</p>
            <div class="flex justify-center gap-4">
              <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
                @click="isNewGameModalOpen = false"
              />
              <UButton label="New Game" color="primary" @click="newGame" />
            </div>
          </div>
        </template>
      </UModal>
      <UColorModeButton class="absolute top-4 right-4" />
    </section>

    <footer class="px-2 py-4">
      <UButton class="w-full" variant="subtle" :color="game.isActive ? 'error' : 'success'" :label="game.isActive ? 'End Turn' : 'Start Turn'" size="xl" block :ui="{ base: 'touch-manipulation', label: 'text-3xl', }" @click="newTurn" />
    </footer>
  </main>
</template>
