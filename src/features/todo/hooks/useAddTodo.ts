import { gql, useMutation } from "@apollo/client"
import { toast } from "sonner"

export const ADD_TODO = gql`
  mutation AddTodo(
    $title: String!
    $description: String!
    $priority: String!
    $user_id: uuid!
  ) {
    insert_todos(
      objects: {
        title: $title
        description: $description
        priority: $priority
        user_id: $user_id
      }
    ) {
      returning {
        id
        title
        description
        priority
        user_id
      }
    }
  }
`

const useAddTodo = () => {
  return useMutation(ADD_TODO, {
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useAddTodo
