import { gql, useMutation } from "@apollo/client"
import { toast } from "sonner"

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: uuid!, $is_done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { is_done: $is_done }) {
      returning {
        id
        is_done
      }
    }
  }
`

const useUpdateTodoCompletion = () => {
  return useMutation(UPDATE_TODO, {
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useUpdateTodoCompletion
