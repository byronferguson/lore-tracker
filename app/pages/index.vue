<script setup lang="ts">
import type { Game } from '~/types/Game';

function resetGame(isOnThePlay = true): Game {
  return {
    player1Name: 'Me',
    player2Name: 'You',
    player1Lore: 0,
    player2Lore: 0,
    isActive: isOnThePlay,
    turns: [{ log: [] }],
  };
}

function newGame(isOnThePlay: boolean) {
  game.value = resetGame(isOnThePlay);
  isNewGameModalOpen.value = false;
}

const isNewGameModalOpen = ref(false);
const isUndoModalOpen = ref(false);

const game = ref<Game>(resetGame());

function handleLoreChange({ playerId, lore }: { playerId: 1 | 2; lore: number }) {
  const activeTurn = game.value.turns[0];

  if(!activeTurn) return;

  const playerLore = game.value[`player${playerId}Lore`];
  const loreTotal = Math.max(0, playerLore + lore);
  const loreChange = loreTotal - playerLore;

  game.value[`player${playerId}Lore`] = loreTotal;

  activeTurn.log.unshift({ playerId, lore, loreChange, loreTotal });
}

function handleUndo() {
  const activeTurn = game.value.turns[0];

  if(!activeTurn) return;
  if(activeTurn.log.length === 0) return;

  const lastChange = activeTurn.log.shift()!;
  game.value[`player${lastChange.playerId}Lore`] = lastChange.loreTotal - lastChange.loreChange;
  // player.lore = Math.max(0, player.lore - lastChange.loreChange);
  isUndoModalOpen.value = false;
}

function newTurn() {
  game.value.isActive = !game.value.isActive;

  // tabulate the end of turn values

  game.value.turns.unshift({ log: [] });
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
              <UButton label="On the Play" color="primary" @click="newGame(true)" />
              <UButton label="On the Draw" color="warning" @click="newGame(false)" />
              <UButton
                label="Cancel"
                color="error"
                variant="outline"
                @click="isNewGameModalOpen = false"
              />
            </div>
          </div>
        </template>
      </UModal>
      <UColorModeButton class="absolute top-4 right-4" />
    </section>

    <footer class="px-6 flex flex-row gap-2">
      <UModal
      v-model:open="isUndoModalOpen"
      title="Undo Last Change?"
      description="This will revert the last lore change made."
    >
      <UButton
        icon="mdi:undo"
        variant="outline"
        color="neutral"
        :ui="{
          base: 'justify-center  touch-manipulation px-4',
          leadingIcon: 'size-8',
        }" />

      <template #content>
        <div class="p-4 text-center">
          <p class="mb-4 text-3xl font-bold">Undo Last Change?</p>
          <p class="mb-8">This will revert the last lore change made.</p>
          <div class="flex justify-center gap-4">
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              @click="isUndoModalOpen = false"
            />
            <UButton label="Undo" color="primary" @click="handleUndo" />
          </div>
        </div>
        </template>
      </UModal>

      <UButton class="flex-grow" variant="subtle" :color="game.isActive ? 'error' : 'success'" :label="game.isActive ? 'End Turn' : 'Start Turn'" size="xl" block :ui="{ base: 'touch-manipulation', label: 'text-3xl', }" @click="newTurn" />
    </footer>
  </main>
</template>
