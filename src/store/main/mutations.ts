import { IUserProfile, IAppNotification } from "@/interfaces"
import { MainState, PersistedState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const mutations = {
  initialize(state: MainState, persistedState: PersistedState) {
    if (persistedState) {
      Object.keys(persistedState).forEach((key) => {
        if (typeof persistedState[key] == "object") {
          state[key] = Array.isArray(persistedState[key])
            ? Object.assign([], persistedState[key])
            : Object.assign({}, persistedState[key])
        } else {
          state[key] = persistedState[key]
        }
      })
    }
    state.isInitialized = true
  },
  setToken(state: MainState, payload: string) {
    state.token = payload
  },
  setLoggedIn(state: MainState, payload: boolean) {
    state.isLoggedIn = payload
    if (!state.isLoggedIn) {
      state.isInitialized = false
    }
  },
  setLogInError(state: MainState, payload: boolean) {
    state.logInError = payload
  },
  setUserProfile(state: MainState, payload: IUserProfile) {
    state.userProfile = payload
  },
  addNotification(state: MainState, payload: IAppNotification) {
    state.notifications.push(payload)
  },
  removeNotification(state: MainState, payload: IAppNotification) {
    state.notifications = state.notifications.filter(
      (notification) => notification !== payload
    )
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { commit } = getStoreAccessors<MainState | any, State>("")

export const commitInitialize = commit(mutations.initialize)
export const commitSetLoggedIn = commit(mutations.setLoggedIn)
export const commitSetLogInError = commit(mutations.setLogInError)
export const commitSetToken = commit(mutations.setToken)
export const commitSetUserProfile = commit(mutations.setUserProfile)
export const commitAddNotification = commit(mutations.addNotification)
export const commitRemoveNotification = commit(mutations.removeNotification)
