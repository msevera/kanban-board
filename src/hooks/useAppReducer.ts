import { useReducer } from 'react';
import type { AppContextType, TaskType, InitiTasksAction, AddTaskAction, UpdateTaskAction, DeleteTaskAction, MoveTaskToStateAction, Task } from '../types'


type Action = InitiTasksAction | AddTaskAction | UpdateTaskAction | DeleteTaskAction | MoveTaskToStateAction;

function reducer(state: AppContextType, action: Action) {
  const { tasks } = state;
  switch (action.type) {
    case 'init_tasks': {
      return {
        ...state,
        tasks: action.data
      }
    }

    case 'update_task': {
      const { id, title } = action.data;
      return {
        ...state,
        tasks: tasks.map(task => {
          if (task.id === id) {
            return {
              ...task,
              title
            }
          }

          return task;
        })
      }
    }

    case 'add_task': {
      const { id, title, type, orderIndex, description } = action.data;
      return {
        ...state,
        tasks: [{
          id,
          title,
          description: description || '',
          type,
          orderIndex
        }, ...state.tasks]
      };
    }

    case 'delete_task': {
      const { id } = action.data;

      return {
        ...state,
        tasks: tasks.filter(task => {
          return task.id !== id
        })
      };
    }

    case 'move_task_to_state': {
      const { id, type, orderIndex } = action.data;

      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            type,
            orderIndex
          }
        }

        return task;
      });


      updatedTasks.sort((left, right) => {
        return left.orderIndex === right.orderIndex ? 0 : left.orderIndex > right.orderIndex ? 1 : -1
      })

      return {
        ...state,
        tasks: updatedTasks
      };
    }

    default:
      throw new Error('Unrecognized reducer action')
  }
}


export const useAppReducer = (initiualContextState: AppContextType) => {
  const [state, dispatch] = useReducer(reducer, initiualContextState);

  const addTask = (newTask: Task) => {
    dispatch({ type: 'add_task', data: newTask })
  }

  const updateTask = (id: string, title: string) => {
    dispatch({ type: 'update_task', data: { id, title } })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: 'delete_task', data: { id } })
  }

  const moveTaskToState = (id: string, type: TaskType, orderIndex: number) => {
    dispatch({ type: 'move_task_to_state', data: { id, type, orderIndex } })
  }

  const initTasks = (tasks: Task[]) => {
    dispatch({ type: 'init_tasks', data: tasks })
  }

  return {
    tasks: state.tasks,
    initTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToState
  }
}