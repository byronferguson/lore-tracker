import { ref } from 'vue';

export type LoreEntry = {
  playerId: 1 | 2;
  lore: number;
  loreChange: number;
  loreTotal: number;
};

export type Turns = Array<LoreEntry[]>;

export function useGame() {
  const player1Name = ref('Me');
  const player2Name = ref('You');
  const lore1 = ref(0);
  const lore2 = ref(0);
  const turns = ref<Turns>([]);

  const isPlayerOneActive = ref(true);

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

    // FIXME: currently only handles undo during the current turn
    if (!lastEntry) return;

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
