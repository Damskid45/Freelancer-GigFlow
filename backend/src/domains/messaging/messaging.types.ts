export interface MessagingRecord {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  kind: string;
  createdAt: string;
  editedAt: string;
  readAt: string;
}
export type MessagingStatus = "active" | "paused" | "archived";
export interface MessagingQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
