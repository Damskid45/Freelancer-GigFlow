import { pool } from "../../db.js";
import type { NotificationsRecord, NotificationsQuery } from "./notifications.types.js";

export class NotificationsRepository {
  async findById(id:string):Promise<NotificationsRecord|null>{
    const result=await pool.query("select * from notifications where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:NotificationsQuery):Promise<NotificationsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from notifications order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as NotificationsRecord[];
  }
}
