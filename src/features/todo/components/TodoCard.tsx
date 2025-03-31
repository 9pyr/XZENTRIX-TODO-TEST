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
  is_done,
  className,
}: TodoCardProps) => {
  const [updateTodo] = useUpdateTodoCompletion()

  const handleUpdateTodo = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    await updateTodo({
      variables: {
        id,
        is_done: !is_done,
      },
    })
  }

  return (
    <Card
      className={cn(
        "w-full text-white",
        {
          "bg-green-600": is_done,
          "bg-sky-600": priority === "NORMAL" && !is_done,
          "bg-orange-600": priority === "HIGH" && !is_done,
        },
        className
      )}
    >
      <CardHeader className="text-xs">
        {is_done ? "DONE" : `${priority} PRIORITY`}
      </CardHeader>
      <CardContent className="flex items-center space-x-4 text-xl">
        <div className="w-full">{title}</div>
        <Checkbox
          id="terms"
          className={cn({
            "border-green-900": is_done,
            "border-sky-900": priority === "NORMAL" && !is_done,
            "border-orange-900": priority === "HIGH" && !is_done,
          })}
          onClick={handleUpdateTodo}
          checked={is_done}
          disabled={is_done}
        />
      </CardContent>
      <CardFooter>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardFooter>
    </Card>
  )
}

export default TodoCard
