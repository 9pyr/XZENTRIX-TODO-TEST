"use client"

import dayjs from "dayjs"

import CreateTodoDialog from "@/features/todo/components/CreateTodoDialog"

const TodoHeader = () => {
  const day = dayjs().date()
  const dayName = dayjs().format("dddd")
  const month = dayjs().format("MMMM")
  const year = dayjs().format("YYYY")

  return (
    <div className="flex font-(family-name:--font-roboto)">
      <div className="flex w-full">
        <div className="text-5xl font-bold">{day}</div>
        <div className="text-sm flex flex-col justify-center ml-2 font-semibold">
          <div>{dayName}</div>
          <div>
            {month} {year}
          </div>
        </div>
      </div>
      <CreateTodoDialog />
    </div>
  )
}

export default TodoHeader
