import { IUserProfile, IAppNotification, ObjectIndexer } from "@/interfaces"

export interface MainState extends ObjectIndexer {
  token: string
  isLoggedIn: boolean
  logInError: boolean
  userProfile: IUserProfile | null
  notifications: IAppNotification[]
}

export interface PersistedState extends ObjectIndexer {
  userProfile: IUserProfile | null
}
