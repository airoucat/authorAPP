export interface UserInfo {
  _id: string
  username: string
  editStatus?: {
    // 表示在编写哪本书哪个卷哪个章节或者截止最后一次向服务器传递数据时打开了哪个章节
    editing?: {
      bookID?: string
      volumeID?: string
      chapterID?: string
    }
  }
}

export interface AuthState {
  token: string
  expiresIn: number
}

export interface InUseUserInfoState {
  auth: UserInfo
}

export interface InUseAuthState {
  auth: AuthState
}
