export interface CategoriesRecord {
  id: string;
  parentId: string;
  name: string;
  slug: string;
  description: string;
  position: string;
  isActive: string;
}
export type CategoriesStatus = "active" | "paused" | "archived";
export interface CategoriesQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
