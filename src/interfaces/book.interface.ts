import { Document, Types } from 'mongoose';

export interface BookProgramInfo extends Document {
  title: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  category: string[];
}

export interface ChapterTree {
  chapterID: Types.ObjectId;
  chapterIndex: number;
  chapterName: string;
}

export interface VolumeTree {
  volumeID: Types.ObjectId;
  volumeIndex: number;
  volumeName: string;
  chapters?: ChapterTree[];
}

export interface BookVolumeChapterTree extends Document {
  bookName: string;
  volumes?: VolumeTree[];
}

export interface createBookInfo {
  bookname: string;
}
