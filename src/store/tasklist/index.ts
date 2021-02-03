import { mutations } from "./mutations"
import { getters } from "./getters"
import { actions } from "./actions"
import { TasklistState } from "./state"

const defaultState: TasklistState = {
  data: { data: "Tasklist data example" },
}

export const tasklistModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
}
