import { Draggable } from '@hello-pangea/dnd'
import type { Task } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { Button } from './Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from '../hooks/useDebounce';
import { Indicator } from './Indicator';

type TaskComponentType = {
  task: Task
  index: number
  onTitleChange: (id: string, title: string) => void
}

export const TaskComponent = ({ task, index, onTitleChange }: TaskComponentType) => {
  const { removeTask } = useAppContext();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedTitle = useDebounce<string>(title, 500);

  useEffect(() => {
    if (debouncedTitle === undefined || task.title === debouncedTitle) return;    
    onTitleChange(task.id, debouncedTitle || '');
  }, [debouncedTitle, task])

  const onEditHandler = useCallback(() => {
    setEdit(true);
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }, [])

  return <Draggable key={task.id} draggableId={task.id} index={index}>
    {
      (provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            twMerge(
              "cursor-default bg-white hover:bg-zinc-50 transition-colors duration-300 rounded-md p-4 border border-zinc-200 shadow-md shadow-gray-50 mb-2",
              snapshot.isDragging && 'bg-zinc-50 shadow-sm shadow-zinc-200'
            )
          }
        >
          <div className='flex flex-col' onClick={onEditHandler}>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center justify-center'>
                <Indicator type={task.type} />
                <div className='text-xs text-gray-400'>
                  {task.id}
                </div>
              </div>
              <Button className='py-1! text-xs text-gray-500 ml-2' onClick={() => {
                removeTask(task.id)
              }}>x</Button>
            </div>
            <div>
              <input ref={inputRef} onBlur={() => setEdit(false)}
                className={twMerge('block text-sm outline-0', !edit && 'hidden')}
                type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className={twMerge('text-sm', edit && 'hidden')}>
                {title}&nbsp;
              </div>
            </div>
          </div>
          {
            task.description && (
              <div className='mt-1 text-sm text-gray-500'>
                {task.description}
              </div>
            )
          }
        </div>
      )
    }
  </Draggable>
}