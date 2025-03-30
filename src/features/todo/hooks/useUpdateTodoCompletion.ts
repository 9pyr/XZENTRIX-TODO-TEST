import { gql, useMutation } from "@apollo/client"

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: uuid!, $isDone: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { isDone: $isDone }) {
      returning {
        id
        isDone
      }
    }
  }
`

const useUpdateTodoCompletion = () => {
  return useMutation(UPDATE_TODO)
}

export default useUpdateTodoCompletion
