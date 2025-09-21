type LogEntry = {
  loreTotal: number;
  loreChange: number;
};

type PlayerTurn = {
  loreTotal: number;
  loreChange: number;
  log: LogEntry[];
};

type Turn = {
  player1: PlayerTurn;
  player2: PlayerTurn;
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
