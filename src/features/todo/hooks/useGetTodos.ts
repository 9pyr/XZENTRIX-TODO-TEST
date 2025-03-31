import { GetTodosResponse, TodoVariables } from "@/features/todo/types"
import { gql, useSubscription } from "@apollo/client"
import { useSession } from "next-auth/react"

export const GET_TODOS = gql`
  subscription GetTodosSubscription(
    $isDone: Boolean = false
    $userEmail: String!
  ) {
    todos(where: { isDone: { _eq: $isDone }, userEmail: { _eq: $userEmail } }) {
      id
      title
      description
      priority
      isDone
      userEmail
    }
  }
`

const useGetTodos = (variables: TodoVariables) => {
  const { data: session } = useSession()

  return useSubscription<GetTodosResponse, TodoVariables>(GET_TODOS, {
    variables: { ...variables, userEmail: session?.user?.email || "" },
    onError: (error) => {
      console.error("Error fetching todos:", error)
    },
  })
}

export default useGetTodos
