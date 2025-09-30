import { useStorage } from '@vueuse/core';

export type LoreEntry = {
  playerId: 1 | 2;
  lore: number;
  loreChange: number;
  loreTotal: number;
};

export type Turns = Array<LoreEntry[]>;

export function useGame() {
  const lore1 = useStorage('lore1', 0);
  const lore2 = useStorage('lore2', 0);
  const turns = useStorage<Turns>('turns', []);

  const isPlayerOneActive = useStorage('isPlayerOneActive', true);

  function changeLore(playerId: 1 | 2, amount: number) {
    let loreTotal;
    let loreChange;

    if (playerId === 1) {
      loreTotal = Math.max(0, lore1.value + amount);
      loreChange = loreTotal - lore1.value;
      lore1.value = loreTotal;
    } else {
      loreTotal = Math.max(0, lore2.value + amount);
      loreChange = loreTotal - lore2.value;
      lore2.value = loreTotal;
    }

    const newEntry: LoreEntry = {
      playerId,
      lore: amount,
      loreChange,
      loreTotal,
    };

    if (turns.value.length === 0) {
      turns.value.unshift([]);
    }

    turns.value[0]!.unshift(newEntry);
  }

  function undoLastChange() {
    if (turns.value.length === 0) return;

    const lastEntry = turns.value[0]!.shift();

    // Remove the turn if it's empty
    if (!lastEntry) {
      turns.value.shift();
      isPlayerOneActive.value = !isPlayerOneActive.value;
      return;
    }

    if (lastEntry.playerId === 1) {
      lore1.value = lastEntry.loreTotal - lastEntry.loreChange;
    } else {
      lore2.value = lastEntry.loreTotal - lastEntry.loreChange;
    }
  }

  function endTurn() {
    turns.value.unshift([]);
    isPlayerOneActive.value = !isPlayerOneActive.value;
  }

  function resetGame(onThePlay = true) {
    lore1.value = 0;
    lore2.value = 0;
    turns.value = [[]];
    isPlayerOneActive.value = onThePlay;
  }

  return {
    lore1,
    lore2,
    turns,
    isPlayerOneActive,
    changeLore,
    undoLastChange,
    endTurn,
    resetGame,
  };
}
