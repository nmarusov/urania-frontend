import { IMessage } from "@/interfaces"
import { api } from "@/api"
import { getStoreAccessors } from "typesafe-vuex"
import { ActionContext } from "vuex"
import { State } from "../state"
import { commitAddNotification } from "../main/mutations"
import { TasklistState } from "./state"
import { dispatchCheckApiError } from "../main/actions"
import { store } from "@/store"

type TasklistContext = ActionContext<TasklistState, State>

export const actions = {
  async actionGeTasklisttData(context: TasklistContext) {
    try {
      const response = await api.tasklist.getData(store.state.main.token)
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
  async actionPostTasklistData(context: TasklistContext, payload: IMessage) {
    try {
      const response = await api.tasklist.postData(
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
const { dispatch } = getStoreAccessors<TasklistState | any, State>("")

export const dispatchGetTasklistData = dispatch(actions.actionGeTasklisttData)
export const dispatchPostTasklistData = dispatch(actions.actionPostTasklistData)
