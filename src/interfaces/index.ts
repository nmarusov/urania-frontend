export interface ObjectIndexer {
  [id: string]: any
}

export interface IUserProfile {
  login: string
  fullName: string
  id: number
}

export interface IDecodedJWT {
  [key: string]: string | string[]
}

export interface IAppNotification {
  content: string
  color?: string
  showProgress?: boolean
}

export interface IMessage {
  msg: string
}

export interface ITasklistData {
  data: string
}

export interface IBpManagerData {
  data: string
}

export interface IModelerData {
  xmlData: string
  svgImage: string
}
