import { MainState } from "./state"
import { getStoreAccessors } from "typesafe-vuex"
import { State } from "../state"

export const getters = {
  isInitialized: (state: MainState) => state.isInitialized,
  loginError: (state: MainState) => state.logInError,
  userProfile: (state: MainState) => state.userProfile,
  token: (state: MainState) => state.token,
  isLoggedIn: (state: MainState) => state.isLoggedIn,
  firstNotification: (state: MainState) =>
    state.notifications.length > 0 && state.notifications[0],
}

const { read } = getStoreAccessors<MainState, State>("")

export const readIsInitialized = read(getters.isInitialized)
export const readIsLoggedIn = read(getters.isLoggedIn)
export const readLoginError = read(getters.loginError)
export const readToken = read(getters.token)
export const readUserProfile = read(getters.userProfile)
export const readFirstNotification = read(getters.firstNotification)
