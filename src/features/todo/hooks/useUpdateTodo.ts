import { gql, useMutation } from "@apollo/client"

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: uuid!
    $title: String!
    $description: String!
    $priority: String!
  ) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { title: $title, description: $description, priority: $priority }
    ) {
      returning {
        id
        title
        description
        priority
      }
    }
  }
`

const useUpdateTodo = () => {
  return useMutation(UPDATE_TODO)
}

export default useUpdateTodo
