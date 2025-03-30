import { GetTodosResponse, TodoVariables } from "@/features/todo/types"
import { gql, useSubscription } from "@apollo/client"

export const GET_TODOS = gql`
  subscription GetTodosSubscription($isDone: Boolean = false) {
    todos(where: { isDone: { _eq: $isDone } }) {
      id
      title
      description
      priority
      isDone
    }
  }
`

const useGetTodos = (variables: TodoVariables) => {
  return useSubscription<GetTodosResponse, TodoVariables>(GET_TODOS, {
    variables,
    onError: (error) => {
      console.error("Error fetching todos:", error)
    },
  })
}

export default useGetTodos
