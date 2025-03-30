"use client"

import Modal from "@/components/Modal"
import OverlayLoading from "@/components/OverlayLoading"
import TodoCard from "@/features/todo/components/TodoCard"
import TodoForm from "@/features/todo/components/TodoForm"
import useDeleteTodo from "@/features/todo/hooks/useDeleteTodo"
import useGetTodos from "@/features/todo/hooks/useGetTodos"
import useUpdateTodo from "@/features/todo/hooks/useUpdateTodo"
import { Todo } from "@/features/todo/types"
import { isEmpty } from "lodash"

const TodoTasks = () => {
  const { data: todoTasks, loading } = useGetTodos({ isDone: false })

  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodo()

  const [updateTodo] = useUpdateTodo()

  if (loading || deleteLoading) {
    return <OverlayLoading />
  }

  if (!todoTasks || isEmpty(todoTasks?.todos)) {
    return <div className="m-auto text-gray-400">No Tasks</div>
  }

  const handleDeleteTodo = (id: string) => async () => {
    await deleteTodo({
      variables: {
        id,
      },
    })
  }

  const handleUpdateTodo =
    (id: string) =>
    async (data: Pick<Todo, "id" | "title" | "description" | "priority">) => {
      const { title, description, priority } = data

      await updateTodo({
        variables: {
          id,
          title,
          description,
          priority,
        },
      })
    }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-2xl font-bold font-(family-name:--font-playfair-display)">
        TODO TASKS
      </div>
      {todoTasks.todos.map(
        ({ id, title, description, priority, isDone }, index) => (
          <Modal
            key={`${id}-${index}`}
            title="Update task"
            triggerButton={
              <div>
                <TodoCard
                  id={id}
                  title={title}
                  description={description}
                  priority={priority}
                  isDone={isDone}
                  className="cursor-pointer"
                />
              </div>
            }
            onConfirm={handleUpdateTodo(id)}
            onDelete={handleDeleteTodo(id)}
            defaultValues={{ title, description, priority }}
          >
            <TodoForm />
          </Modal>
        )
      )}
    </div>
  )
}

export default TodoTasks
