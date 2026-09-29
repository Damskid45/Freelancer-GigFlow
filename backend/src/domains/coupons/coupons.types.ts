export interface CouponsRecord {
  id: string;
  code: string;
  kind: string;
  value: string;
  maxDiscount: string;
  minSpend: string;
  startsAt: string;
  endsAt: string;
  usageLimit: string;
  usedCount: string;
}
export type CouponsStatus = "active" | "paused" | "archived";
export interface CouponsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
