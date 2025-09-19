<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { Players } from '~/types/Player';

function newGame() {
  players.value = [
    { id: 1, name: 'Me', lore: 0, loreLog: [0], changeLog: [] as number[] },
    { id: 2, name: 'You', lore: 0, loreLog: [0], changeLog: [] as number[] },
  ];

  open.value = false;
}

const open = ref(false);

const players = ref<Players>([
  {
    id: 1,
    name: 'Me',
    lore: 0,
    loreLog: [0],
    changeLog: [],
  },
  { id: 2, name: 'You', lore: 0, loreLog: [0], changeLog: [] },
]);
useDark();

function handleLoreChange({ playerId, lore }: { playerId: number; lore: number }) {
  const player = players.value.find(p => p.id === playerId);
  if (!player) return;

  player.lore = Math.max(0, player.lore + lore);
  player.loreLog.push(player.lore);
  player.changeLog.push(lore);
}

function handleUndo({ playerId }: { playerId: number }) {
  const player = players.value.find(p => p.id === playerId);
  if (!player) return;

  if (player.changeLog.length === 0) return;

  const lastChange = player.changeLog.pop()!;
  player.loreLog.pop();
  player.lore = Math.max(0, player.lore - lastChange);
}
</script>

<template>
  <div class="grid min-h-dvh grid-cols-[auto_1fr_auto] gap-2 px-6 text-2xl relative">
    <LoreButtons class="self-center" :player-id="1" @change="handleLoreChange" @undo="handleUndo" />
    <GamePad :players />
    <LoreButtons class="self-center" :player-id="2" @change="handleLoreChange" @undo="handleUndo" />

    <UModal v-model:open="open">
      <UButton class="absolute top-4 left-4" icon="mdi:add" variant="ghost" color="neutral" />

      <template #content>
        <div class="p-4 text-center">
          <p class="mb-4 text-3xl font-bold">Start New Game?</p>
          <p class="mb-8">This will reset all lore counts and logs.</p>
          <div class="flex justify-center gap-4">
            <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
            <UButton label="New Game" color="primary" @click="newGame" />
          </div>
        </div>
      </template>
    </UModal>
    <UColorModeButton class="absolute top-4 right-4" />
  </div>
</template>
