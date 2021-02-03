import { ITasklistData } from "@/interfaces"
import { TasklistState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const mutations = {
  setTasklistData(state: TasklistState, payload: ITasklistData) {
    state.data = payload
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { commit } = getStoreAccessors<TasklistState | any, State>("")

export const commitSetTasklistData = commit(mutations.setTasklistData)
