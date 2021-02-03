import { mutations } from "./mutations"
import { getters } from "./getters"
import { actions } from "./actions"
import { MainState } from "./state"

const defaultState: MainState = {
  isInitialized: false,
  isLoggedIn: false,
  token: "",
  logInError: false,
  userProfile: null,
  notifications: [],
}

export const mainModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
}
