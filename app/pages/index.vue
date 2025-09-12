<script setup lang="ts">
import { useDark, useMediaQuery } from '@vueuse/core';

function newGame() {
  players.value = [
    { id: 2, name: 'Player 2', lore: 0 },
    { id: 1, name: 'Player 1', lore: 0 },
  ];
  activePlayerId.value = 1;
  log.value = [];
}

const isPortrait = useMediaQuery('(orientation: portrait)');

const players = ref([
  { id: 2, name: 'Player 2', lore: 0 },
  { id: 1, name: 'Player 1', lore: 0 },
]);
const activePlayerId = ref(1);
const log = ref<
  Array<{ player: number; change?: number; total?: number; turn?: number; type?: string }>
>([]);
useDark();

function handleLoreChange({ playerId, change }: { playerId: number; change: number }) {
  const player = players.value.find(p => p.id === playerId);
  if (!player) return;
  player.lore = Math.max(0, Math.min(20, player.lore + change));
  log.value.push({ player: playerId, change, total: player.lore });
}

function passTurn() {
  activePlayerId.value = activePlayerId.value === 1 ? 2 : 1;
  // Add a log entry for new turn
  const turnCount = log.value.filter(e => e.type === 'turn').length + 1;
  log.value.push({ type: 'turn', player: activePlayerId.value, turn: turnCount });
}

function getPlayerClass(id: number) {
  if (isPortrait.value && id === 2) return 'rotated-player';
  return '';
}
</script>

<template>
  <div class="p-8 flex flex-col justify-center min-h-screen">
    <div class="flex flex-row justify-between">
      <PlayerLore
        v-if="players[0]"
        :player="players[0]"
        :is-active="players[0].id === activePlayerId"
        :class="getPlayerClass(players[0].id)"
        class="max-h-1/2 lg:max-h-1/3"
        @change-lore="handleLoreChange"
        @pass-turn="passTurn"
      />
      <LoreLog :log="log" class="overflow-y-auto max-h-1/2 lg:max-h-1/3" />
      <PlayerLore
        v-if="players[1]"
        :player="players[1]"
        :is-active="players[1].id === activePlayerId"
        :class="getPlayerClass(players[1].id)"
        class="max-h-1/2 lg:max-h-1/3"
        @change-lore="handleLoreChange"
        @pass-turn="passTurn"
      />
    </div>

    <div class="controls">
      <UButton color="primary" class="new-game-btn" @click="newGame">New Game</UButton>
      <UColorModeButton class="ml-4" />
    </div>
  </div>
</template>

<style scoped>
.new-game-btn {
  font-size: 1.2rem;
  margin-right: 1rem;

  .players-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 2rem;
  }
  .player-card {
    flex: 1 1 0;
    min-width: 0;
    max-width: 400px;
    box-sizing: border-box;
  }
  .log-panel.log-between {
    min-width: 440px;
    max-width: 640px;
    background: var(--ui-bg-secondary);
    border-radius: 8px;
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.new-game-btn {
  font-size: 1.2rem;
  margin-right: 1rem;
}
@media (orientation: landscape) {
  .players-row {
    flex-direction: row;
  }
}
/* .players styles removed, not used in new layout */
.rotated-player {
  transform: rotate(180deg);
}
.rotated-player {
  transform: rotate(180deg);
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
/* Drawer log styles */
.log-content {
  padding: 1rem;
  background: var(--ui-bg-secondary);
  border-radius: 8px;
  max-height: 260px;
  overflow-y: auto;
}
@media (max-width: 600px) {
  .players {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
