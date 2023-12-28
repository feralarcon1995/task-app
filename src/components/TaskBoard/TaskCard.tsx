
import { useState } from 'react';
//dnd
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
//icon
import Trash from '../../icons/Trash';
//types 
import { ID, Task } from '../../types/types';


interface TaskProps {
  task: Task;
  handleDeleteTask: (id: ID) => void;
  handleUpdateTask: (id: ID, content: string) => void;
}
export const TaskCard: React.FC<TaskProps> = ({ task, handleDeleteTask, handleUpdateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false)

  //hook for dnd
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  //style of dnd
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //edit mode
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false)
  }
  
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='flex flex-col gap-2 rounded-xl border border-pink-400 p-3 max-h-full min-h-[150px] cursor-grab hover:border-pink-600 transition-all hover:bg-black'
      >
        <textarea
          className='h-[90%] w-full resize-none border-none rounded bg-transparent text-white first-letter:text-pink-500  p-3 outline-none'
          autoFocus
          defaultValue={task.content}
          placeholder='Task content here'
          onBlur={toggleEditMode}
          onKeyDown={(e) => e.key === 'Enter' && toggleEditMode()}
          onChange={(e) => handleUpdateTask(task.id, e.target.value)}>

        </textarea>
      </div>
    )
  }

  //isDraggin
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='relative  opacity-50 flex-col gap-2 rounded-xl border border-pink-400 p-3 h-[100px] min-h-[100px] max-h-full cursor-grabk' />
    )
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='relative flex flex-col gap-2 rounded-xl border border-pink-400 p-3 min-h-[100px] max-h-full cursor-grab hover:border-pink-600  transition-all hover:bg-black task animate-fade-up animate-once animate-delay-800'
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}>
      <div className='flex items-center justify-between  overflow-y-scroll'>
        <p className='text-white first-letter:text-pink-500 first-letter:uppercase self-start w-[90%] '>{task.content} </p>
        {mouseIsOver && (
          <button
            onClick={() => handleDeleteTask(task.id)} className='transition-all absolute top-[13px] right-[13px] hover:text-pink-500'><Trash /></button>
        )}
      </div>
    </div>

  )
}
