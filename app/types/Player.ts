export type LogEntry = {
  loreTotal: number;
  loreChange: number;
};

export type Turn = {
  turnNumber: number;
  loreTotal: number;
  loreChange: number;
  log: LogEntry[];
};

export type Player = {
  id: number;
  name: string;
  lore: number;
  currentTurn: Turn;
  turns: Turn[];
  isActive: boolean;
};

export type Players = Player[];
