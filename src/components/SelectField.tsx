import { REQUIRED_FIELD_MESSAGE } from "@/components/constants"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormContext } from "react-hook-form"

interface SelectFieldProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
  defaultValue?: string
  disabled?: boolean
}

const SelectField = ({
  name,
  label,
  options,
  placeholder,
  required,
  defaultValue,
  disabled,
}: SelectFieldProps) => {
  const { control } = useFormContext()

  return (
    <div className="grid items-center gap-4">
      <FormField
        control={control}
        name={name}
        rules={{ required: required && REQUIRED_FIELD_MESSAGE }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {!required && !disabled && <span>(ถ้ามี)</span>}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default SelectField
