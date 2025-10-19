export type TaskType = "ToDo" | "InProgress" | "Done";

export type Task = {
  id: string
  title: string
  description?: string
  type: TaskType
  orderIndex: number
}