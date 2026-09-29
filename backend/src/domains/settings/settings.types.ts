export interface SettingsRecord {
  id: string;
  userId: string;
  theme: string;
  locale: string;
  currency: string;
  emailDigest: string;
  marketingOptIn: string;
  updatedAt: string;
}
export type SettingsStatus = "active" | "paused" | "archived";
export interface SettingsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
