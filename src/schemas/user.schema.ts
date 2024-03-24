import * as mongoose from 'mongoose';
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

export const UserSchema = new Schema({
  username: { type: String, required: true }, // 登录用户名
  password: { type: String, required: true }, // 密码
  editStatus: {
    // 表示在编写哪本书哪个卷哪个章节或者截止最后一次向服务器传递数据时打开了哪个章节
    editing: {
      bookID: { type: ObjectId },
      volumeID: { type: ObjectId },
      chapterID: { type: ObjectId },
    },
  },
});
