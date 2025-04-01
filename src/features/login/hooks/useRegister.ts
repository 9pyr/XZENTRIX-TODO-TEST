import { registerApi } from "@/lib/apis/login"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export default useRegister
