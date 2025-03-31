import { register } from "@/lib/apis/login"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useRegister
