import { useCallback, useState } from 'react';
import './App.css'
import { Column } from './components/Column';
import { useAppContext } from './contexts/AppContext'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import type { TaskType } from './types';
import { Filter } from './components/Filter';

function App() {
  const { moveTaskToState, actionIsLoading } = useAppContext();
  const [activeItem, setActiveItem] = useState('');

  const onBeforeCaptureHandler = useCallback(({ draggableId }: { draggableId: string }) => {
    setActiveItem(draggableId)
  }, [activeItem]);

  const onDragEndHandler = useCallback((result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    moveTaskToState(activeItem, destination.droppableId as TaskType, destination.index, destination.index > source.index)
  }, [activeItem]);

  return (
    <div className='flex flex-col max-w-6xl m-auto h-screen py-4 px-4'>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-xl'>Kanban board</div>
        {
          actionIsLoading && <div className='text-sm ml-4 text-zinc-600'>Saving...</div>
        }
      </div>
      <Filter />
      <div className='flex flex-1 flex-col sm:flex-row justify-between gap-2'>
        <DragDropContext
          onBeforeCapture={onBeforeCaptureHandler}
          onDragEnd={onDragEndHandler}>
          <Column type="ToDo" />
          <Column type="InProgress" />
          <Column type="Done" />
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
