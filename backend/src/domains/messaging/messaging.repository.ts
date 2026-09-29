import { pool } from "../../db.js";
import type { MessagingRecord, MessagingQuery } from "./messaging.types.js";

export class MessagingRepository {
  async findById(id:string):Promise<MessagingRecord|null>{
    const result=await pool.query("select * from messaging where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:MessagingQuery):Promise<MessagingRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from messaging order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as MessagingRecord[];
  }
}
