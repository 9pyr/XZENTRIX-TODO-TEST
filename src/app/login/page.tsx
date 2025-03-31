"use client"

import Container from "@/components/Container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/features/login/components/LoginForm"
import RegisterForm from "@/features/login/components/RegisterForm"
import { useState } from "react"

const LoginPage = () => {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <Container>
      <Tabs
        defaultValue="login"
        value={tab}
        className="w-[400px]"
        onValueChange={(tab) => setTab(tab as "login" | "register")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm setTab={setTab} />
        </TabsContent>
      </Tabs>
    </Container>
  )
}

export default LoginPage
