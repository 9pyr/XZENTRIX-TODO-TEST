"use client"

import Container from "@/components/Container"
import DoneTasks from "@/features/todo/components/DoneTasks"
import TodoHeader from "@/features/todo/components/TodoHeader"
import TodoTasks from "@/features/todo/components/TodoTasks"

export default function Home() {
  return (
    <Container>
      <TodoHeader />
      <hr className="border-dashed border-t-3" />
      <TodoTasks />
      <DoneTasks />
    </Container>
  )
}
