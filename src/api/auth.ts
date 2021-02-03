import { HTTP, authHeaders } from "./common"
import { IUserProfile } from "@/interfaces"

export default {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams()
    params.append("username", username)
    params.append("password", password)

    return HTTP.post("/auth/access-token", params)
  },
  async getMe(token: string) {
    return HTTP.get<IUserProfile>("/auth/me", authHeaders(token))
  },
}
