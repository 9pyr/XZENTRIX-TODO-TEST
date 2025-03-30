"use client"

import React from "react"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form"

interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>
  className?: string
}

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  className,
  ...props
}: React.PropsWithChildren<FormProps<T>>) => {
  const methods = useForm<T>(props)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
