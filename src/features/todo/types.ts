export interface Todo {
  id: string
  title: string
  description: string
  priority: "NORMAL" | "HIGH"
  isDone?: boolean
}

export interface GetTodosResponse {
  todos: Todo[]
}

export interface TodoVariables {
  isDone: boolean
  userEmail: string
}
