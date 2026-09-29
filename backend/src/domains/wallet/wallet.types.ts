export interface WalletRecord {
  id: string;
  userId: string;
  type: string;
  amount: string;
  currency: string;
  status: string;
  reference: string;
  createdAt: string;
}
export type WalletStatus = "active" | "paused" | "archived";
export interface WalletQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
