type LogEntry = {
  playerId: 1 | 2;
  lore: number;
  loreChange: number;
  loreTotal: number;
};

type Turn = {
  log: LogEntry[];
};

type Turns = Turn[];

export type Game = {
  player1Name: string;
  player2Name: string;
  player1Lore: number;
  player2Lore: number;
  isActive: boolean;
  turns: Turns;
};
