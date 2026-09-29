export interface FilesRecord {
  id: string;
  ownerId: string;
  orderId: string;
  name: string;
  mimeType: string;
  sizeBytes: string;
  storageKey: string;
  scanStatus: string;
  createdAt: string;
}
export type FilesStatus = "active" | "paused" | "archived";
export interface FilesQuery { page:number; size:number; search?:string; sort?:string; direction?:"asc"|"desc"; }
