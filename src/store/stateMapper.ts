import localDbService from "./localDbService"
import { State } from "./state"

export const setPersistedState = (username: string, state: State) => {
  const persistedState = mapToPersistedState(state)
  return localDbService.setItem(username, persistedState)
}

export const getPersistedState = (username: string) => {
  if (username) {
    return localDbService.getItem(username)
  } else {
    throw new Error("Undefined user name")
  }
}

export const deletePersistedState = (username: string) => {
  localDbService.removeItem(username)
}

export const mapToPersistedState = (state: State) => {
  return {
    tasklistData: state.tasklist.data,
    bpManagerData: state.bpmanager.data,
  }
}
