<script setup lang="ts">
import type { LogEntry, Players, Turn } from '~/types/Player';

function resetPlayers() {
  return [
    {
      id: 1,
      name: 'Me',
      lore: 0,
      currentTurn: { turnNumber: 1, loreTotal: 0, loreChange: 0, log: [] as LogEntry[] },
      turns: [] as Turn[],
      isActive: true,
    },
    {
      id: 2,
      name: 'You',
      lore: 0,
      currentTurn: { turnNumber: 1, loreTotal: 0, loreChange: 0, log: [] as LogEntry[] },
      turns: [] as Turn[],
      isActive: false,
    },
  ];
}

function newGame() {
  players.value = resetPlayers();
  isNewGameModalOpen.value = false;
}

const isNewGameModalOpen = ref(false);

const turnNumber = ref(1);
const players = ref<Players>(resetPlayers());

function handleLoreChange({ playerId, lore }: { playerId: number; lore: number }) {
  const player = players.value.find(p => p.id === playerId);
  if (!player) return;

  if (lore < 0 && player.lore === 0) return;

  player.lore = Math.max(0, player.lore + lore);

  player.currentTurn.log.push({ loreChange: lore, loreTotal: player.lore });
  player.currentTurn.loreTotal = player.lore;
}

function handleUndo({ playerId }: { playerId: number }) {
  // const player = players.value.find(p => p.id === playerId);
  // if (!player) return;
  // if (player.log.length === 0) return;
  // const lastChange = player.log.pop()!;
  // player.lore = Math.max(0, player.lore - lastChange.loreChange);
}

function toggleActivePlayer() {
  turnNumber.value += 1;

  players.value.forEach(player => {
    if (player.currentTurn.log.length > 0 || player.isActive) {
      player.turns.push(player.currentTurn);
    }

    player.currentTurn = {
      turnNumber: turnNumber.value,
      loreTotal: player.lore,
      loreChange: 0,
      log: [],
    };
    player.isActive = !player.isActive;
  });
}
</script>

<template>
  <div class="grid min-h-dvh grid-cols-[auto_1fr_auto] gap-2 px-6 text-2xl relative">
    <LoreButtons class="self-center" :player-id="1" @change="handleLoreChange" @undo="handleUndo" />

    <TurnTracked :players @toggle-active-player="toggleActivePlayer" />

    <LoreButtons class="self-center" :player-id="2" @change="handleLoreChange" @undo="handleUndo" />

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
  </div>
</template>
