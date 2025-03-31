import { gql, useMutation } from "@apollo/client"
import { toast } from "sonner"

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

const useDeleteTodo = () => {
  return useMutation(DELETE_TODO, {
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useDeleteTodo
