import Vue from "vue"
import Vuex, { StoreOptions } from "vuex"

import { mainModule } from "./main"
import { tasklistModule } from "./tasklist"
import { bpManagerModule } from "./bpmanager"
import { State } from "./state"
import { persistencePlugin } from "./persistentPlugin"

Vue.use(Vuex)

const storeOptions: StoreOptions<State> = {
  modules: {
    main: mainModule,
    tasklist: tasklistModule,
    bpmanager: bpManagerModule,
  },
  plugins: [persistencePlugin],
}

export const store = new Vuex.Store<State>(storeOptions)

export default store
