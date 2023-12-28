import { useMemo, useState } from 'react';
//dnd
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
//icons
import Trash from '../../icons/Trash';
import PlusIcon from '../../icons/PlusIcon';
//components
import { Button } from '../Button/Button';
import { TaskCard } from './TaskCard';
//types
import { Column, ID, Task } from '../../types/types';

interface ColumnContainerProps {
  column: Column;
  handleDeleteColumn: (id: ID) => void;
  handleUpdateColumn: (id: ID, name: string) => void;

  handleCreateTask: (columnID: string) => void;
  handleUpdateTask: (id: ID, content: string) => void;
  handleDeleteTask: (id: ID) => void;
  tasks: Task[];
}



const ColumnContainer: React.FC<ColumnContainerProps> =
  ({
    column,
    handleDeleteColumn,
    handleUpdateColumn,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    tasks }) => {

    const [editMode, setEditMode] = useState(false);

    const tasksIDs = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition, 
      isDragging,
    } = useSortable({
      id: column.id,
      data: {
        type: 'Column',
        column,
      },
      disabled: editMode,
    })


    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    if (isDragging) {
      return (
        <div
          ref={setNodeRef}
          style={style}
          className='bg-stone-900 w-[320px] border border-pink-300 h-[500px] max-h-full text-pink-300 text-xl rounded-md opacity-40'>
        </div>
      )
    }

    return (
      <article
        ref={setNodeRef}
        style={style}
        className='bg-stone-900 w-[350px] h-[500px] max-h-full text-pink-300 text-xl p-3 rounded-md flex flex-col border border-pink-500 animate-fade-up animate-once animate-delay-500'>
        <div className='border border-pink-500 flex items-center justify-between p-3 gap-2 bg-black/65'>
          <div
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
            className='flex items-center gap-2'>

            <h2 className=' font-bold  rounded-sm cursor-grab rouded-b-none outline-none'>
              {editMode ?
                <input
                  type="text"
                  className='bg-[#111] w-full px-2 first-letter:font-bold rounded-sm outline-none focus:border-pink-300'
                  value={column.name}
                  onChange={(e) => handleUpdateColumn(column.id, e.target.value)}
                  onBlur={() => setEditMode(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditMode(false)} /> : column.name}
            </h2>
          </div>
          <button
            className='transition-all hover:text-pink-500 '
            onClick={() => handleDeleteColumn(column.id)}>
            <Trash />
          </button>
        </div>

        <div className='flex flex-grow flex-col gap-2 py-3 overflow-x-hidden overflow-y-auto '>
          <SortableContext items={tasksIDs}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask} />
            ))}
          </SortableContext>
        </div>
        <Button
          className='w-full hover:bg-black'
          onClick={() => handleCreateTask(column.id)}>
          <PlusIcon /> Add Task
        </Button>
      </article>
    )
  }

export default ColumnContainer