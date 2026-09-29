export interface AdminRecord {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  reason: string;
  createdAt: string;
  metadata: string;
}
export type AdminStatus = "active" | "paused" | "archived";
export interface AdminQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
