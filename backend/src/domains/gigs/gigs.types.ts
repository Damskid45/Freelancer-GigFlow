export interface GigsRecord {
  id: string;
  sellerId: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  categoryId: string;
  status: string;
  basePrice: string;
  deliveryDays: string;
  revisionCount: string;
  searchText: string;
}
export type GigsStatus = "active" | "paused" | "archived";
export interface GigsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
