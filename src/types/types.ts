export type ID = string;

export type Column = {
  id: ID;
  name: string;
}

export type Task = {
  id: ID;
  columnID: ID;
  content: string;
}