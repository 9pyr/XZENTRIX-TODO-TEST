import Form from "@/components/Form"
import InputField from "@/components/InputField"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginFormData } from "@/features/login/types"
import { LoginSchema } from "@/features/login/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"

const LoginForm = () => {
  const handleLogin = async (values: LoginFormData) => {
    const { email, password } = values

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      })

      console.error(res?.error)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form<LoginFormData>
      onSubmit={handleLogin}
      resolver={zodResolver(LoginSchema)}
    >
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputField name="email" label="Email" required />
          <InputField name="password" label="Password" required />
        </CardContent>
        <CardFooter>
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export default LoginForm
