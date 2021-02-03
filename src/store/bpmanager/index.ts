import { mutations } from "./mutations"
import { getters } from "./getters"
import { actions } from "./actions"
import { BpManagerState } from "./state"

const defaultState: BpManagerState = {
  data: { data: "BP Manager data example" },
}

export const bpManagerModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
}
