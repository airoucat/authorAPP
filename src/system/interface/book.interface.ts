export interface BookProgramInfo {
  _id: string;
  title: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: string[];
}

export interface NewBookInfo {
  bookname: string;
}

export interface ChapterTree {
  chapterID: string;
  chapterIndex: number;
  chapterName: string;
}

export interface VolumeTree {
  volumeID: string;
  volumeIndex: number;
  volumeName: string;
  chapters?: ChapterTree[];
}

export interface BookVolumeChapterTree {
  bookID: string;
  bookName: string;
  volumes?: VolumeTree[];
}
