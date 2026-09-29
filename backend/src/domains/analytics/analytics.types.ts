export interface AnalyticsRecord {
  id: string;
  actorId: string;
  eventName: string;
  entityType: string;
  entityId: string;
  occurredAt: string;
  properties: string;
}
export type AnalyticsStatus = "active" | "paused" | "archived";
export interface AnalyticsQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
