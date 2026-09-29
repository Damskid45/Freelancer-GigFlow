export interface NotificationsRecord {
  id: string;
  userId: string;
  kind: string;
  title: string;
  body: string;
  readAt: string;
  createdAt: string;
  metadata: string;
}
export type NotificationsStatus = "active" | "paused" | "archived";
export interface NotificationsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
