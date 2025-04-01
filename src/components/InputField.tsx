"use client"

import { REQUIRED_FIELD_MESSAGE } from "@/components/constants"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { useFormContext } from "react-hook-form"

interface InputFieldProps extends React.ComponentProps<"input"> {
  name: string
  label: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
}

const InputField = ({
  name,
  label,
  required,
  placeholder,
  disabled,
  ...props
}: InputFieldProps) => {
  const { control } = useFormContext()

  return (
    <div className="grid items-center gap-4">
      <FormField
        control={control}
        name={name}
        rules={{ required: required && REQUIRED_FIELD_MESSAGE }}
        disabled={disabled}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {!required && !disabled && <span>(ถ้ามี)</span>}
            </FormLabel>
            <FormControl>
              <Input
                {...props}
                placeholder={placeholder}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default InputField
