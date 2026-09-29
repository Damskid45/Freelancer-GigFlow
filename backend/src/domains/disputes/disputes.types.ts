export interface DisputesRecord {
  id: string;
  orderId: string;
  openedBy: string;
  reason: string;
  status: string;
  summary: string;
  decision: string;
  openedAt: string;
  resolvedAt: string;
}
export type DisputesStatus = "active" | "paused" | "archived";
export interface DisputesQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
