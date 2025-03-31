import { GetTodosResponse, TodoVariables } from "@/features/todo/types"
import { gql, useSubscription } from "@apollo/client"
import { toast } from "sonner"

export const GET_TODOS = gql`
  subscription GetTodosSubscription($is_done: Boolean = false) {
    todos(where: { is_done: { _eq: $is_done } }) {
      id
      title
      description
      priority
      is_done
    }
  }
`

const useGetTodos = (variables: TodoVariables) => {
  return useSubscription<GetTodosResponse, TodoVariables>(GET_TODOS, {
    variables,
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useGetTodos
