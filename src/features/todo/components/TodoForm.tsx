import InputField from "@/components/InputField"
import SelectField from "@/components/SelectField"

interface TodoFormProps {
  disabled?: boolean
}

const TodoForm = ({ disabled }: TodoFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <InputField
        name="title"
        label="Title"
        placeholder="Title"
        disabled={disabled}
        required
      />
      <InputField
        name="description"
        label="Description"
        placeholder="Description"
        disabled={disabled}
        required
      />
      <SelectField
        name="priority"
        label="Priority"
        defaultValue="NORMAL"
        disabled={disabled}
        options={[
          { value: "NORMAL", label: "Normal" },
          { value: "HIGH", label: "High" },
        ]}
        required
      />
    </div>
  )
}

export default TodoForm
