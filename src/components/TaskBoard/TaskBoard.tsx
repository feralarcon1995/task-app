import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
//data
import { Cols, defaultTasks } from "../../data/data";
//dnd
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
//icons
import PlusIcon from "../../icons/PlusIcon";
//components
import { Button } from "../Button/Button";
import ColumnContainer from "./ColumnContainer";
//types
import { Column, ID, Task } from "../../types/types";
import { TaskCard } from "./TaskCard";


export const TaskBoard: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [columns, setColumns] = useState<Column[]>(Cols);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const columnsID = useMemo(() => columns.map((column) => column.id), [columns]);

  //dnd hook
  const sensor = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    }
  }));
  const generateId = () => {
    return Math.round(Math.random() * 10002).toString();
  }

  //tasks
  const handleCreateTask = (columnID: ID) => {
    const newTask: Task = {
      id: generateId(),
      columnID,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  const handleUpdateTask = (id: ID, content: string) => {
    const updateTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(updateTask);
  }
  const handleDeleteTask = (id: ID) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  //columns
  const handleNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      name: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, newColumn])
  }

  const handleDeleteColumn = (id: ID) => {
    const filteredColumn = columns.filter((column) => column.id !== id);
    setColumns(filteredColumn);

    const newTask = tasks.filter((task) => task.columnID !== id);
    setTasks(newTask);
  }

  const handleUpdateColumn = (id: ID, name: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, name } : column
      )
    );
  };

  //dnd functions
  const handleOnDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  const handleOnDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeID = active.id;
    const overID = over.id;

    if (activeID === overID) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex((column) => column.id === activeID);
      const overColumnIndex = columns.findIndex((column) => column.id === overID);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  const handleOnDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeID = active.id;
    const overID = over.id;

    if (activeID === overID) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeID);
        tasks[activeIndex].columnID = overID.toString();
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };


  return (
    <main className="flex flex-col gap-6 p-6 mx-auto container overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensor}
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        onDragOver={handleOnDragOver}
      >
        <Button
          className="animate-fade-up animate-once animate-delay-500"
          onClick={() => handleNewColumn()} ><PlusIcon /> Add Column</Button>
        {createPortal(
          <DragOverlay>
            {activeColumn &&
              <ColumnContainer
                column={activeColumn}
                handleDeleteColumn={handleDeleteColumn}
                handleUpdateColumn={handleUpdateColumn}
                handleCreateTask={handleCreateTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                tasks={tasks.filter(task => task.columnID === activeColumn.id)}
              />}

            {activeTask &&
              <TaskCard
                task={activeTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
              />}
          </DragOverlay>,
          document.body
        )}

        <section className="flex gap-4 items-center">
          <SortableContext items={columnsID}>
            {columns.map((column) =>
              <ColumnContainer
                key={column.id}
                column={column}
                handleDeleteColumn={handleDeleteColumn}
                handleUpdateColumn={handleUpdateColumn}
                handleCreateTask={handleCreateTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                tasks={tasks.filter(task => task.columnID === column.id)}
              />
            )}
          </SortableContext>

        </section>
      </DndContext>

    </main>

  );
};
