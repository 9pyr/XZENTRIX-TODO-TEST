import Modal from "@/components/Modal"
import OverlayLoading from "@/components/OverlayLoading"
import { Button } from "@/components/ui/button"
import TodoForm from "@/features/todo/components/TodoForm"
import useAddTodo from "@/features/todo/hooks/useAddTodo"
import { Todo } from "@/features/todo/types"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"

const CreateTodoDialog = () => {
  const { data: session } = useSession()

  const [addTodo, { loading }] = useAddTodo()

  const handleConfirm = async (
    data: Pick<Todo, "id" | "title" | "description" | "priority">
  ) => {
    const { title, description, priority } = data

    await addTodo({
      variables: {
        title,
        description,
        priority,
        userEmail: session?.user?.email,
      },
    })
  }

  return (
    <>
      {loading && <OverlayLoading />}
      <div className="flex items-center gap-2">
        <Modal
          title="Create a new task"
          triggerButton={
            <Button size="icon">
              <Plus strokeWidth={4} />
            </Button>
          }
          confirmText="Create Task"
          onConfirm={handleConfirm}
        >
          <TodoForm />
        </Modal>
        <span className="font-bold whitespace-nowrap">NEW TASK</span>
      </div>
    </>
  )
}

export default CreateTodoDialog
