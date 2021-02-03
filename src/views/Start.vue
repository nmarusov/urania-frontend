<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { store } from "@/store"
import { dispatchCheckLoggedIn } from "@/store/main/actions"
import {
  readIsLoggedIn,
  readIsInitialized,
  readUserProfile,
} from "@/store/main/getters"
import { Route, NavigationGuardNext } from "vue-router"
import { commitInitialize } from "@/store/main/mutations"
import { getPersistedState } from "@/store/stateMapper"
import { PersistedState } from "@/store/main/state"

const startRouteGuard = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => {
  await dispatchCheckLoggedIn(store)

  if (readIsLoggedIn(store)) {
    if (to.path === "/login" || to.path === "/") {
      next("/apps")
    } else {
      next()
    }
    if (!readIsInitialized(store)) {
      // Если состояние Vuex не инициализировано, попытаться загрузить сохранённое состояние из IndexedDB
      getPersistedState(readUserProfile(store)?.login ?? "Anonymous").then(
        (state) => {
          commitInitialize(store, state as PersistedState)
        }
      )
    }
  } else if (!readIsLoggedIn(store)) {
    if (to.path === "/" || (to.path as string).startsWith("/apps")) {
      next("/login")
    } else {
      next()
    }
  }
}

@Component
export default class Start extends Vue {
  public beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    startRouteGuard(to, from, next)
  }

  public beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    startRouteGuard(to, from, next)
  }
}
</script>
