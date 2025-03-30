import { gql, useMutation } from "@apollo/client"

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    insert_users_one(object: { email: $email, password: $password }) {
      id
      email
    }
  }
`

const useRegister = () => {
  return useMutation(REGISTER_USER)
}

export default useRegister
