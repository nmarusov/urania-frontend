import { BpManagerState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const getters = {
  bpManagerData: (state: BpManagerState) => state.data,
}

const { read } = getStoreAccessors<BpManagerState, State>("")

export const readBpManagerData = read(getters.bpManagerData)
