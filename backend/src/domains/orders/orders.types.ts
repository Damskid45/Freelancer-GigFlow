export interface OrdersRecord {
  id: string;
  gigId: string;
  buyerId: string;
  sellerId: string;
  status: string;
  subtotal: string;
  platformFee: string;
  total: string;
  dueAt: string;
  completedAt: string;
  revisionCount: string;
}
export type OrdersStatus = "active" | "paused" | "archived";
export interface OrdersQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
