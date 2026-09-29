export interface TeamsRecord {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}
export type TeamsStatus = "active" | "paused" | "archived";
export interface TeamsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
