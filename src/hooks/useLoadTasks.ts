import { useEffect, useState } from 'react'
import type { Task, TaskType } from '../types'


// NOTE 1
// On the backend all tasks would live in one collection/table (e.g. in MongoDB collection, PostreSQL table) and it would contain OrderIndex field
// There are two ways we can load them from API. Using one reques to load all tasks, or separate API request per column (ToDo, InProgress, Done)
// I used approach with one request

// NOTE 2 
// Reordering happens by calculating new orderIndex(mean vlaue) between two neighbors

const tasksKey = 'tasks_data';

const getTasks = (): Task[] => {
  const tasksJSON = localStorage.getItem(tasksKey);
  let tasks = []
  if (tasksJSON) {
    tasks = JSON.parse(tasksJSON)
  }

  return tasks;
}

const load = async (): Promise<Task[]> => {
  // Faking call to API to showcase the loading state
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasks();
      tasks.sort((left, right) => {
        return left.orderIndex === right.orderIndex ? 0 : left.orderIndex > right.orderIndex ? 1 : -1
      })
      resolve(tasks);
    }, 1000)
  })
}

const storeMoveTaskToState = async (id: string, type: TaskType, index: number): Promise<void> => {
  // Faking call to API to showcase the loading state
  // Duplicating front-ent logic for demontrating purposes
  return new Promise((resolve) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(item => {
      if (item.id === id) {
        return {
          ...item,
          type,
          orderIndex: index
        }
      }

      return item;
    });


    updatedTasks.sort((left, right) => {
      return left.orderIndex === right.orderIndex ? 0 : left.orderIndex > right.orderIndex ? 1 : -1
    })

    localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
    setTimeout(() => {
      resolve();
    }, 1000)
  })
}

const storeDeleteTask = async (id: string): Promise<void> => {
  // Faking call to API to showcase the loading state
  return new Promise((resolve) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(item => {
      return item.id !== id
    })

    localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));

    setTimeout(() => {
      resolve();
    }, 1000)
  })
}

const storeAddTask = async (newTask: Task): Promise<void> => {
  // Faking call to API to showcase the loading state
  return new Promise((resolve) => {
    const tasks = getTasks();
    const updatedTasks = [...tasks, newTask]
    localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
    setTimeout(() => {
      resolve();
    }, 1000)
  })
}

const storeUpdateTask = async (id: string, title: string): Promise<void> => {
  // Faking call to API to showcase the loading state
  return new Promise((resolve) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title
        }
      }

      return task;
    });

    localStorage.setItem(tasksKey, JSON.stringify(updatedTasks));
    setTimeout(() => {
      resolve();
    }, 1000)
  })
}


export const useLoadTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await load();
      setTasks(data);
      setIsLoading(false);
    }

    run();
  }, []);

  return {
    tasks,
    isLoading,
    storeMoveTaskToState,
    storeDeleteTask,
    storeAddTask,
    storeUpdateTask
  }
}