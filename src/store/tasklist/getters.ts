import { TasklistState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const getters = {
  tasklistData: (state: TasklistState) => state.data,
}

const { read } = getStoreAccessors<TasklistState, State>("")

export const readTasklistData = read(getters.tasklistData)
