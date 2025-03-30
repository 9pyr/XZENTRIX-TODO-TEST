import { gql, useMutation } from "@apollo/client"

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
  return useMutation(DELETE_TODO)
}

export default useDeleteTodo
