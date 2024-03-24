import * as mongoose from 'mongoose';
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

export const BookBaseInfoSchema = new Schema({
  title: { type: String, required: true, unique: true },
  createdBy: { type: ObjectId, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  category: [{ type: String }],
});

export const BookVolumeChapterTreeSchema = new Schema({
  bookName: { type: String, required: true },
  volumes: [
    {
      volumeID: { type: String, required: true },
      volumeIndex: { type: Number },
      volumeName: { type: String, required: true },
      chapters: [
        {
          chapterID: { type: String, required: true },
          chapterIndex: { type: Number },
          chapterName: { type: String, required: true },
        },
      ],
    },
  ],
});
