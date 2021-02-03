import { IBpManagerData } from "@/interfaces"
import { BpManagerState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const mutations = {
  setBpManagerData(state: BpManagerState, payload: IBpManagerData) {
    state.data = payload
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { commit } = getStoreAccessors<BpManagerState | any, State>("")

export const commitSetTasklistData = commit(mutations.setBpManagerData)
