export interface ReviewsRecord {
  id: string;
  orderId: string;
  authorId: string;
  targetId: string;
  rating: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
export type ReviewsStatus = "active" | "paused" | "archived";
export interface ReviewsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
