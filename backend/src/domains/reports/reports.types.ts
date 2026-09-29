export interface ReportsRecord {
  id: string;
  ownerId: string;
  type: string;
  status: string;
  parameters: string;
  createdAt: string;
  completedAt: string;
  downloadKey: string;
}
export type ReportsStatus = "active" | "paused" | "archived";
export interface ReportsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
