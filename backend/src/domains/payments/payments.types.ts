export interface PaymentsRecord {
  id: string;
  orderId: string;
  buyerId: string;
  provider: string;
  providerReference: string;
  status: string;
  amount: string;
  currency: string;
  authorizedAt: string;
  capturedAt: string;
}
export type PaymentsStatus = "active" | "paused" | "archived";
export interface PaymentsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
