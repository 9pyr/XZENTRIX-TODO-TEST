import serverApollo from "@/lib/apolloServer"
import { gql } from "@apollo/client"
import bcrypt from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    insert_users_one(object: { email: $email, password: $password }) {
      id
      email
    }
  }
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body

      const hashedPassword = await bcrypt.hash(password, 10)

      await serverApollo.mutate({
        mutation: REGISTER_USER,
        variables: { email, password: hashedPassword },
      })
    } else {
      res.status(200)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
