export interface FavoritesRecord {
  id: string;
  userId: string;
  collectionId: string;
  gigId: string;
  createdAt: string;
  position: string;
}
export type FavoritesStatus = "active" | "paused" | "archived";
export interface FavoritesQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
