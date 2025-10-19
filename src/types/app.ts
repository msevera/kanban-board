import type { Task, TaskType } from './task'

export type AppContextType = {
  tasks: Task[]
}

export type InitiTasksAction = {
  type: 'init_tasks';
  data: Task[]
}

export type AddTaskAction = {
  type: 'add_task';
  data: {
    id: string
    title: string;
    type: TaskType;
    orderIndex: number;
    description?: string;
  }
};

export type UpdateTaskAction = {
  type: 'update_task';
  data: {
    id: string;
    title: string
  };
};

export type DeleteTaskAction = {
  type: 'delete_task';
  data: {
    id: string;
  };
};

export type MoveTaskToStateAction = {
  type: 'move_task_to_state';
  data: {
    id: string;
    type: TaskType;
    orderIndex: number;
  };
};
