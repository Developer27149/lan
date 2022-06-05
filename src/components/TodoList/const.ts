export enum ETabs {
  今日,
  重要,
  总览,
}

export enum ETodoStatus {
  计划,
  在做了,
  搞定,
}

export interface IComment {
  createdAt: number;
  content: string;
}

export interface ITodoItem {
  title: string;
  content: string;
  isImportant: boolean;
  status: ETodoStatus;
  dateRange: [number, number];
  time: string;
  comments: IComment[];
  createdAt: number;
  id: number;
}

export const tagColor = "#8e42d3";

export const todoDayDateFormatStr = "DD/MM/YYYY";
export const fullDateStr = todoDayDateFormatStr + " HH:mm:ss";
