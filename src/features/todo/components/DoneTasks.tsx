"use client"

import Modal from "@/components/Modal"
import OverlayLoading from "@/components/OverlayLoading"
import TodoCard from "@/features/todo/components/TodoCard"
import TodoForm from "@/features/todo/components/TodoForm"
import useDeleteTodo from "@/features/todo/hooks/useDeleteTodo"
import useGetTodos from "@/features/todo/hooks/useGetTodos"
import { isEmpty } from "lodash"

const DoneTasks = () => {
  const { data: doneTasks, loading } = useGetTodos({
    is_done: true,
  })

  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodo()

  if (loading || deleteLoading) {
    return <OverlayLoading />
  }

  if (isEmpty(doneTasks?.todos)) {
    return null
  }

  const handleDeleteTodo = (id: string) => async () => {
    await deleteTodo({
      variables: {
        id,
      },
    })
  }

  return (
    <>
      <hr className="border-dashed border-t-3" />
      <div className="flex flex-col gap-4">
        <div className="text-center text-2xl font-bold font-(family-name:--font-playfair-display)">
          DONE TASKS
        </div>
        {doneTasks?.todos?.map(
          ({ id, title, description, priority, is_done }, index) => (
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
                    is_done={is_done}
                    className="cursor-pointer"
                  />
                </div>
              }
              onDelete={handleDeleteTodo(id)}
              defaultValues={{ title, description, priority }}
            >
              <TodoForm disabled />
            </Modal>
          )
        )}
      </div>
    </>
  )
}

export default DoneTasks
