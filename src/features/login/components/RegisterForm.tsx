import Form from "@/components/Form"
import InputField from "@/components/InputField"
import OverlayLoading from "@/components/OverlayLoading"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useRegister from "@/features/login/hooks/useRegister"
import { RegisterFormData } from "@/features/login/types"
import { RegisterSchema } from "@/features/login/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface RegisterFormProps {
  setTab: (tab: "login" | "register") => void
}

const RegisterForm = ({ setTab }: RegisterFormProps) => {
  const { mutateAsync, isPending } = useRegister()

  if (isPending) return <OverlayLoading />

  const handleRegister = async (values: RegisterFormData) => {
    const { email, password } = values

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await mutateAsync({ email, password: hashedPassword })

      setTab("login")
      toast.success("Registration successful")

      setTimeout(() => {
        toast.info("Please login to continue")
      }, 1000)

      redirect("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form<RegisterFormData>
      onSubmit={handleRegister}
      resolver={zodResolver(RegisterSchema)}
    >
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputField name="email" label="Email" required />
          <InputField
            name="password"
            label="Password"
            type="password"
            required
          />
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Register</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export default RegisterForm
