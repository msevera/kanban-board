import { Droppable } from '@hello-pangea/dnd'
import { useAppContext } from '../contexts/AppContext';
import { TaskComponent } from './TaskComponent'
import type { Task, TaskType } from '../types';
import { useCallback, useMemo, useState } from 'react';
import { Button } from './Button';
import { NewTask } from './NewTask';
import { Indicator } from './Indicator';

type ColumnType = {
  type: TaskType
}

const labels = {
  'ToDo': 'Todo',
  'InProgress': 'In Progress',
  'Done': 'Done'
}

export const Column = ({ type }: ColumnType) => {
  const { isLoading, tasks, addTask, updateTask } = useAppContext();

  const [showNewTask, setShowNewTask] = useState(false);

  const items = useMemo(() => {
    return tasks.filter(tasks => tasks.type === type);
  }, [tasks])

  const onCancelHandler = useCallback(() => {
    setShowNewTask(false)
  }, [])

  const onCreateHandler = useCallback((title: string, description: string) => {
    addTask(title, type, description);
    setShowNewTask(false)
  }, [addTask])

  const onTitleChangeHandler = useCallback((id: string, title: string) => {
    updateTask(id, title)
  }, [])

  return (
    <Droppable droppableId={type}>
      {
        (provided, snapshot) => (
          <div className={`flex flex-col flex-1 p-4 bg-zinc-50 rounded-md transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-zinc-100' : 'bg-zinc-50'}`}>
            <div className='flex justify-between items-center mb-4'>
              <div className='text-sm flex justify-center items-center'>
                <Indicator type={type} />
                {labels[type]} <span className='text-gray-600 ml-2'>{items.length}</span>
              </div>
              <Button
                onClick={() => setShowNewTask(true)}
              >+</Button>
            </div>
            <div
              ref={provided.innerRef}
              className={`flex-1`}
              {...provided.droppableProps}
            >
              {
                showNewTask && (
                  <div className='mb-2'>
                    <NewTask onCancel={onCancelHandler} onCreate={onCreateHandler} />
                  </div>
                )
              }
              {
                isLoading ? <div className='text-gray-500 text-sm'>Loading...</div> : <div>
                  {
                    items.map((task: Task, index: number) => {
                      return <TaskComponent key={task.id} task={task} index={index} onTitleChange={onTitleChangeHandler} />
                    })
                  }
                </div>
              }

              {provided.placeholder}
            </div>
          </div>
        )
      }
    </Droppable>
  )
}