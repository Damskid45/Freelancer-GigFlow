export interface UsersRecord {
  id: string;
  email: string;
  displayName: string;
  role: string;
  avatarUrl: string;
  bio: string;
  country: string;
  timeZone: string;
  createdAt: string;
  updatedAt: string;
}
export type UsersStatus = "active" | "paused" | "archived";
export interface UsersQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
