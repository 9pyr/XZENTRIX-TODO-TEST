import { gql, useMutation } from "@apollo/client"

export const ADD_TODO = gql`
  mutation AddTodo(
    $title: String!
    $description: String!
    $priority: String!
    $userEmail: String!
  ) {
    insert_todos(
      objects: {
        title: $title
        description: $description
        priority: $priority
        userEmail: $userEmail
      }
    ) {
      returning {
        id
        title
        description
        priority
        userEmail
      }
    }
  }
`

const useAddTodo = () => {
  return useMutation(ADD_TODO)
}

export default useAddTodo
