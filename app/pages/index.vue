<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { Players } from '~/types/Player';

function newGame() {
  players.value = [
    { id: 1, name: 'Me', lore: 0, loreLog: [0], changeLog: [] as number[] },
    { id: 2, name: 'You', lore: 0, loreLog: [0], changeLog: [] as number[] },
  ];
}

// const isPortrait = useMediaQuery('(orientation: portrait)');

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
</script>

<template>
  <div class="grid min-h-dvh grid-cols-[auto_1fr_auto] gap-2 px-6 text-2xl relative">
    <LoreButtons class="self-center" :player-id="1" @change="handleLoreChange" />
    <GamePad :players />
    <LoreButtons class="self-center" :player-id="2" @change="handleLoreChange" />

    <UButton
      class="absolute top-4 left-4"
      icon="mdi:restart"
      variant="ghost"
      color="neutral"
      @click="newGame"
    />
    <UColorModeButton class="absolute top-4 right-4" />
  </div>
</template>
