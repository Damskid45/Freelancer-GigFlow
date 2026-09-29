export type ID = string;
export type ISODate = string;
export type Money = { amount: number; currency: "NGN" | "USD" | "EUR" | "GBP" };
export type Page = { index: number; size: number };
export type PageResult<T> = { items: T[]; page: Page; total: number; hasNext: boolean };
export type UserRole = "buyer" | "seller" | "moderator" | "admin";
export type OrderStatus = "pending" | "accepted" | "in_progress" | "delivered" | "revision" | "completed" | "cancelled" | "disputed";
export type GigStatus = "draft" | "published" | "paused" | "archived";
export type PaymentStatus = "created" | "authorized" | "captured" | "failed" | "refunded";
export type DeliveryKind = "file" | "link" | "milestone" | "message";
export interface AuthContext { userId: ID; role: UserRole; sessionId: ID; }
export interface DomainEvent<T=unknown> { id: ID; type: string; occurredAt: ISODate; actorId: ID; payload: T; }
