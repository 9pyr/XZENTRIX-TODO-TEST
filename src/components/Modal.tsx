import Form from "@/components/Form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { isFunction } from "lodash"
import React, { useState } from "react"
import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form"

interface TodoDialogProps<T extends FieldValues> {
  title: string
  triggerButton: React.ReactNode
  onConfirm?: SubmitHandler<T>
  onDelete?: () => Promise<void> | void
  confirmText?: string
  description?: string
  defaultValues?: DefaultValues<T>
}

const Modal = <T extends FieldValues>({
  children,
  title,
  triggerButton,
  confirmText = "Save changes",
  description,
  onConfirm,
  onDelete,
  defaultValues,
}: React.PropsWithChildren<TodoDialogProps<T>>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = async (values: T) => {
    if (isFunction(onConfirm)) {
      await onConfirm(values as T)
    }

    setIsOpen(false)
  }

  const handleDelete = async () => {
    if (isFunction(onDelete)) {
      await onDelete()
    }

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form onSubmit={handleConfirm} defaultValues={defaultValues}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">{children}</div>
          <DialogFooter>
            <div className="w-full">
              {onDelete && (
                <Button type="button" variant="delete" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
            {onConfirm && <Button type="submit">{confirmText}</Button>}
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
