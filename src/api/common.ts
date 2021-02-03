import axios from "axios"
import { apiUrl } from "@/env"

export const HTTP = axios.create({
  baseURL: `${apiUrl}/api/v1`,
})

export function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
