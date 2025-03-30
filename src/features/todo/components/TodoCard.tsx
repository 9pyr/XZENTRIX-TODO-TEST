import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import useUpdateTodoCompletion from "@/features/todo/hooks/useUpdateTodoCompletion"
import { Todo } from "@/features/todo/types"
import { cn } from "@/lib/utils"
import { MouseEvent } from "react"

export interface TodoCardProps extends Todo {
  id: string
  className?: string
}

const TodoCard = ({
  id,
  title,
  description,
  priority,
  isDone,
  className,
}: TodoCardProps) => {
  const [updateTodo] = useUpdateTodoCompletion()

  const handleUpdateTodo = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    await updateTodo({
      variables: {
        id,
        isDone: !isDone,
      },
    })
  }

  return (
    <Card
      className={cn(
        "w-full text-white",
        {
          "bg-green-600": isDone,
          "bg-sky-600": priority === "NORMAL" && !isDone,
          "bg-orange-600": priority === "HIGH" && !isDone,
        },
        className
      )}
    >
      <CardHeader className="text-xs">
        {isDone ? "DONE" : `${priority} PRIORITY`}
      </CardHeader>
      <CardContent className="flex items-center space-x-4 text-xl">
        <div className="w-full">{title}</div>
        <Checkbox
          id="terms"
          className={cn({
            "border-green-900": isDone,
            "border-sky-900": priority === "NORMAL" && !isDone,
            "border-orange-900": priority === "HIGH" && !isDone,
          })}
          onClick={handleUpdateTodo}
          checked={isDone}
          disabled={isDone}
        />
      </CardContent>
      <CardFooter>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardFooter>
    </Card>
  )
}

export default TodoCard
