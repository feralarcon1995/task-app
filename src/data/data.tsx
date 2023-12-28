import { Column, Task } from "../types/types";

export const Cols: Column[] = [
  {
    id: "todo",
    name: "Todo",
  },
  {
    id: "doing",
    name: "In progress",
  },
  {
    id: "done",
    name: "Done",
  },
];


export const defaultTasks: Task[] = [
  {
    id: "1",
    columnID: "todo",
    content: "Starting a new project",
  },
  {
    id: "2",
    columnID: "doing",
    content:
      "Creating a repository ",
  },
  {
    id: "3",
    columnID: "done",
    content: "Change the ui application",
  },
]