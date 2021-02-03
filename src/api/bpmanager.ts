import { HTTP, authHeaders } from "./common"
import { IMessage } from "@/interfaces"

export default {
  async postData(token: string, data: IMessage) {
    return HTTP.post("/bpmanager/test_post", data, authHeaders(token))
  },
  async getData(token: string) {
    return HTTP.get<IMessage>("/bpmanager/test_get", authHeaders(token))
  },
}
