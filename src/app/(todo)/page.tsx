"use client"

import Container from "@/components/Container"
import DoneTasks from "@/features/todo/components/DoneTasks"
import TodoHeader from "@/features/todo/components/TodoHeader"
import TodoTasks from "@/features/todo/components/TodoTasks"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [session])

  return (
    <Container>
      <TodoHeader />
      <hr className="border-dashed border-t-3" />
      <TodoTasks />
      <DoneTasks />
    </Container>
  )
}
