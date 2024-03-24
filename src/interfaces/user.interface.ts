import { Document, Types } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  editStatus: {
    // 表示在编写哪本书哪个卷哪个章节或者截止最后一次向服务器传递数据时打开了哪个章节
    editing: {
      bookID: string;
      volumeID: string;
      chapterID: string;
    };
  };
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface UserStatus {
  username: string;
}

export interface TokenUserInfo {
  _id: Types.ObjectId;
  username: string;
  // ###! 后续可能会追加权限选项
}

export interface UserInfo {
  _id: Types.ObjectId;
  username: string;
  editStatus?: {
    // 表示在编写哪本书哪个卷哪个章节或者截止最后一次向服务器传递数据时打开了哪个章节
    editing?: {
      bookID?: string;
      volumeID?: string;
      chapterID?: string;
    };
  };
}
/**
 * ###!
 * 这里bookID等id属性需要修改为ObjectId类型
 *
 */
