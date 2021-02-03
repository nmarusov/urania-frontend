import { IMessage } from "@/interfaces"
import { api } from "@/api"
import { getStoreAccessors } from "typesafe-vuex"
import { ActionContext } from "vuex"
import { State } from "../state"
import { commitAddNotification } from "../main/mutations"
import { BpManagerState } from "./state"
import { dispatchCheckApiError } from "../main/actions"
import { store } from "@/store"

type BpManagerContext = ActionContext<BpManagerState, State>

export const actions = {
  async actionGetBpManagerData(context: BpManagerContext) {
    try {
      const response = await api.bpmanager.getData(store.state.main.token)
      if (response.data) {
        commitAddNotification(context, {
          content: response.data.msg,
          color: "success",
        })
      }
    } catch (error) {
      await dispatchCheckApiError(store, error)
    }
  },
  async actionPostBpManagerData(context: BpManagerContext, payload: IMessage) {
    try {
      const response = await api.bpmanager.postData(
        store.state.main.token,
        payload
      )
      if (response.data) {
        commitAddNotification(store, {
          content: response.data.msg,
          color: "success",
        })
      }
    } catch (error) {
      await dispatchCheckApiError(store, error)
    }
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { dispatch } = getStoreAccessors<BpManagerState | any, State>("")

export const dispatchGetBpManagerData = dispatch(actions.actionGetBpManagerData)
export const dispatchPostBpManagerData = dispatch(
  actions.actionPostBpManagerData
)
