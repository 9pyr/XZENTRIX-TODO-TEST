import serverApollo from "@/lib/apolloServer"
import { gql } from "@apollo/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const GET_USER_QUERY = gql`
  query GetUser($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`

const EXPIRED_TIME = 60 * 60

interface ExtendedUser extends User {
  accessToken?: string
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user?: {
      sub?: string
      email?: string | null
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials")
        }

        const { email, password } = credentials

        if (!email || !password) {
          throw new Error("Email and password are required")
        }

        const { data } = await serverApollo.query({
          query: GET_USER_QUERY,
          variables: { email },
        })

        if (data.users.length === 0) {
          throw new Error("User not found")
        }

        const user = data.users[0]

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid email or password")
        }

        const accessToken = jwt.sign(
          {
            sub: user.id,
            email: user.email,
            "https://hasura.io/jwt/claims": {
              "x-hasura-allowed-roles": ["user"],
              "x-hasura-default-role": "user",
              "x-hasura-user-id": user.id,
            },
          },
          process.env.NEXTAUTH_SECRET as string,
          {
            expiresIn: EXPIRED_TIME,
          }
        )

        return {
          id: user.id,
          email: user.email,
          accessToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as ExtendedUser).accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.sub = token.sub
      }
      session.accessToken = token.accessToken as string | undefined
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: EXPIRED_TIME,
    updateAge: EXPIRED_TIME,
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
