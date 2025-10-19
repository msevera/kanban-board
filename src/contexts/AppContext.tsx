import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppContextType, TaskType, Task } from '../types/index';
import { useAppReducer } from '../hooks/useAppReducer';
import { useLoadTasks } from '../hooks/useLoadTasks';


type AppContextWithActionsType = AppContextType & {
  isLoading: boolean,
  actionIsLoading: boolean,
  filter: string,
  setFilter: (value: string) => void,
  addTask: (title: string, type: TaskType, description?: string) => void,
  updateTask: (id: string, title: string) => void,
  removeTask: (id: string) => void,
  moveTaskToState: (id: string, type: TaskType, destinationIndex: number, down: boolean) => void
}

const AppContext = createContext<AppContextWithActionsType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw Error('AppContext must be wrapped with AppProvider')
  }

  return context;
}


type AppProviderType = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderType) => {
  const { isLoading, tasks: initialTasks, storeAddTask, storeUpdateTask, storeDeleteTask, storeMoveTaskToState } = useLoadTasks();
  const [actionIsLoading, setActionIsLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const {
    tasks,
    initTasks: dispatchInitTasks,
    addTask: dispatchAddTask,
    updateTask: dispatchUpdateTask,
    deleteTask: dispatchDeleteTask,
    moveTaskToState: dispatchMoveTaskToState
  } = useAppReducer({
    tasks: initialTasks
  });


  useEffect(() => {
    dispatchInitTasks(initialTasks);
  }, [initialTasks])

  const addTask = useCallback(async (title: string, type: TaskType, description?: string) => {
    setActionIsLoading(true);
    const tasksWithType = tasks.filter(task => task.type === type);
    const firstItem = tasksWithType[0]
    const id = Date.now().toString();
    const newTask: Task = {
      id,
      title,
      type,
      orderIndex: firstItem ? firstItem.orderIndex - 1 : 0,
      description
    }

    dispatchAddTask(newTask);
    await storeAddTask(newTask);
    setActionIsLoading(false);
  }, [tasks])


  const moveTaskToState = useCallback(async (id: string, type: TaskType, destinationIndex: number, down: boolean) => {
    setActionIsLoading(true);
    const currentTask = tasks.find(task => task.id === id);
    const tasksWithType = tasks.filter(task => task.type === type);

    let leftNeighbor;
    let rightNeighbor;
    if (currentTask?.type !== type || (currentTask?.type === type && !down)) {
      leftNeighbor = tasksWithType[destinationIndex - 1];
      rightNeighbor = tasksWithType[destinationIndex];
    } else {
      leftNeighbor = tasksWithType[destinationIndex];
      rightNeighbor = tasksWithType[destinationIndex + 1];
    }

    let newIdx = destinationIndex;
    if (leftNeighbor && rightNeighbor) {
      const lIdx = leftNeighbor.orderIndex;
      const rIdx = rightNeighbor.orderIndex;
      const nIdx = (lIdx + rIdx) / 2;
      newIdx = nIdx;
    } else if (leftNeighbor === undefined && rightNeighbor) {
      newIdx = rightNeighbor.orderIndex - 1
    } else if (leftNeighbor && rightNeighbor === undefined) {
      newIdx = leftNeighbor.orderIndex + 1;
    }

    dispatchMoveTaskToState(id, type, newIdx);
    await storeMoveTaskToState(id, type, newIdx);
    setActionIsLoading(false);
  }, [tasks])

  const removeTask = useCallback(async (id: string) => {
    setActionIsLoading(true);
    dispatchDeleteTask(id);
    await storeDeleteTask(id);
    setActionIsLoading(false);
  }, [])

  const updateTask = useCallback(async (id: string, title: string) => {
    setActionIsLoading(true);
    dispatchUpdateTask(id, title);
    await storeUpdateTask(id, title)
    setActionIsLoading(false);
  }, [])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return task.title.toLowerCase().includes(filter) || task?.description?.toLowerCase().includes(filter);
    })
  }, [tasks, filter])

  return (
    <AppContext.Provider value={{
      isLoading,
      actionIsLoading,
      tasks: filteredTasks,
      filter,
      setFilter,
      addTask,
      updateTask,
      removeTask,
      moveTaskToState
    }}>
      {children}
    </AppContext.Provider>
  )
}
