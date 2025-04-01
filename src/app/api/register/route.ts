import serverApollo from "@/lib/apolloServer"
import { gql } from "@apollo/client"

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    insert_users_one(object: { email: $email, password: $password }) {
      id
      email
    }
  }
`

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    await serverApollo.mutate({
      mutation: REGISTER_USER,
      variables: { email, password },
    })
    return new Response("User registered successfully")
  } catch (err) {
    return new Response(err as string, { status: 500 })
  }
}
