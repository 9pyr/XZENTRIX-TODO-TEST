import { LoginFormData } from "@/features/login/types"
import axios from "axios"

export async function register(params: LoginFormData) {
  const { data } = await axios.post("/api/register", params)

  return data
}
