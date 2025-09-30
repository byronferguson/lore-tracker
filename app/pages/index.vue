<script setup lang="ts">
import { useWakeLock } from '@vueuse/core';

const { isSupported, isActive, request, release } = useWakeLock();

onMounted(() => {
  if (isSupported.value) {
    request('screen');
  }
});

onUnmounted(() => {
  if (isActive.value) {
    release();
  }
});

const { lore1, lore2, turns, isPlayerOneActive, changeLore, undoLastChange, endTurn, resetGame } =
  useGame();

function newGame(isOnThePlay: boolean) {
  resetGame(isOnThePlay);
  isNewGameModalOpen.value = false;
}

const isNewGameModalOpen = ref(false);
const isUndoModalOpen = ref(false);

function handleLoreChange({ playerId, lore }: { playerId: 1 | 2; lore: number }) {
  changeLore(playerId, lore);
}

function handleUndo() {
  undoLastChange();
  isUndoModalOpen.value = false;
}
</script>

<template>
  <main class="flex flex-col">
    <section
      class="grid game-board grid-cols-[auto_1fr_auto] gap-2 px-6 text-2xl relative flex-grow"
    >
      <LoreButtons :player-id="1" @change="handleLoreChange" @undo="handleUndo" />
      <GameBoard
        :turns="turns"
        :lore1="lore1"
        :lore2="lore2"
        :isPlayerOneActive="isPlayerOneActive"
      />
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
          }"
        />

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

      <UButton
        class="flex-grow"
        variant="subtle"
        :color="isPlayerOneActive ? 'error' : 'success'"
        :label="isPlayerOneActive ? 'End Turn' : 'Start Turn'"
        size="xl"
        block
        :ui="{ base: 'touch-manipulation', label: 'text-3xl' }"
        @click="endTurn"
      />
    </footer>
  </main>
</template>
