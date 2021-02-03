import { setPersistedState } from "./stateMapper"
import { State } from "./state"
import { Store } from "vuex"

//decide which mutations you want to listen in on, for persisting app data
const mutationsOfInterest = ["setSomeVariable"]

const ofInterest = (mutation: string) => {
  return mutationsOfInterest.includes(mutation)
}

export const persistencePlugin = (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    if (ofInterest(mutation.type) && store.state.main.isInitialized) {
      setPersistedState(state.main.userProfile?.login ?? "Anonymous", state)
    }
  })
}
