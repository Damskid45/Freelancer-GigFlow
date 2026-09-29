export interface SearchRecord {
  id: string;
  query: string;
  normalized: string;
  actorId: string;
  createdAt: string;
  filters: string;
}
export type SearchStatus = "active" | "paused" | "archived";
export interface SearchQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
