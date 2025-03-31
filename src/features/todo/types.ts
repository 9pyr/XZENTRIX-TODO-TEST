export interface Todo {
  id: string
  title: string
  description: string
  priority: "NORMAL" | "HIGH"
  is_done?: boolean
}

export interface GetTodosResponse {
  todos: Todo[]
}

export interface TodoVariables {
  is_done: boolean
  priority_order?: "asc" | "desc"
}
