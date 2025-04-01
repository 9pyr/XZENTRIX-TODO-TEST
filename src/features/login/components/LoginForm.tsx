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
import { redirect } from "next/navigation"
import { toast } from "sonner"

const LoginForm = () => {
  const handleLogin = async (values: LoginFormData) => {
    const { email, password } = values

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!res?.ok) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Login successful")
      redirect("/")
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
          <InputField
            name="password"
            label="Password"
            type="password"
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export default LoginForm
