import { IAppNotification } from "@/interfaces"
import { api } from "@/api"
import router from "@/router"
import { getLocalToken, removeLocalToken, saveLocalToken } from "@/utils"
import { AxiosError } from "axios"
import { getStoreAccessors } from "typesafe-vuex"
import { ActionContext } from "vuex"
import { State } from "../state"
import {
  commitAddNotification,
  commitRemoveNotification,
  commitSetLoggedIn,
  commitSetLogInError,
  commitSetToken,
  commitSetUserProfile,
} from "./mutations"
import { getPersistedState } from "@/store/stateMapper"
import { MainState } from "./state"

type MainContext = ActionContext<MainState, State>

export const actions = {
  async actionLogIn(
    context: MainContext,
    payload: { username: string; password: string }
  ) {
    try {
      const response = await api.auth.logInGetToken(
        payload.username,
        payload.password
      )
      const token = response.data.access_token
      if (token) {
        saveLocalToken(token)
        commitSetToken(context, token)
        commitSetLoggedIn(context, true)
        commitSetLogInError(context, false)
        await dispatchGetUserProfile(context)
        await dispatchRouteLoggedIn(context)
        commitAddNotification(context, {
          content: "Успешный вход",
          color: "success",
        })

        if (!context.state.isInitialized) {
          getPersistedState(payload.username).then((persistedState) => {
            context.commit("initialize", persistedState)
          })
        }
      } else {
        await dispatchLogOut(context)
      }
    } catch (err) {
      commitSetLogInError(context, true)
      await dispatchLogOut(context)
    }
  },
  async actionGetUserProfile(context: MainContext) {
    try {
      const response = await api.auth.getMe(context.state.token)
      if (response.data) {
        commitSetUserProfile(context, response.data)
      }
    } catch (error) {
      await dispatchCheckApiError(context, error)
    }
  },
  async actionCheckLoggedIn(context: MainContext) {
    if (!context.state.isLoggedIn) {
      let token = context.state.token
      if (!token) {
        const localToken = getLocalToken()
        if (localToken) {
          commitSetToken(context, localToken)
          token = localToken
        }
      }
      if (token) {
        try {
          const response = await api.auth.getMe(token)
          commitSetLoggedIn(context, true)
          commitSetUserProfile(context, response.data)
        } catch (error) {
          await dispatchRemoveLogIn(context)
        }
      } else {
        await dispatchRemoveLogIn(context)
      }
    }
  },
  async actionRemoveLogIn(context: MainContext) {
    removeLocalToken()
    commitSetToken(context, "")
    commitSetLoggedIn(context, false)
  },
  async actionLogOut(context: MainContext) {
    await dispatchRemoveLogIn(context)
    await dispatchRouteLogOut(context)
  },
  async actionUserLogOut(context: MainContext) {
    await dispatchLogOut(context)
    commitAddNotification(context, {
      content: "Вы вышли из системы",
      color: "success",
    })
  },
  actionRouteLogOut(_context: MainContext) {
    if (router.currentRoute.path !== "/login") {
      router.push("/login")
    }
  },
  async actionCheckApiError(context: MainContext, payload: AxiosError) {
    if (payload.response) {
      if (payload.response.status === 401) {
        await dispatchLogOut(context)
      }
    }
  },
  actionRouteLoggedIn(_context: MainContext) {
    if (
      router.currentRoute.path === "/login" ||
      router.currentRoute.path === "/"
    ) {
      router.push("/main")
    }
  },
  async removeNotification(
    context: MainContext,
    payload: { notification: IAppNotification; timeout: number }
  ) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        commitRemoveNotification(context, payload.notification)
        resolve(true)
      }, payload.timeout)
    })
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { dispatch } = getStoreAccessors<MainState | any, State>("")

export const dispatchCheckApiError = dispatch(actions.actionCheckApiError)
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn)
export const dispatchGetUserProfile = dispatch(actions.actionGetUserProfile)
export const dispatchLogIn = dispatch(actions.actionLogIn)
export const dispatchLogOut = dispatch(actions.actionLogOut)
export const dispatchUserLogOut = dispatch(actions.actionUserLogOut)
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn)
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn)
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut)
export const dispatchRemoveNotification = dispatch(actions.removeNotification)
