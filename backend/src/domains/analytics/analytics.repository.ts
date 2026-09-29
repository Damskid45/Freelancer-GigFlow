import { pool } from "../../db.js";
import type { AnalyticsRecord, AnalyticsQuery } from "./analytics.types.js";

export class AnalyticsRepository {
  async findById(id:string):Promise<AnalyticsRecord|null>{
    const result=await pool.query("select * from analytics where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:AnalyticsQuery):Promise<AnalyticsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from analytics order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as AnalyticsRecord[];
  }
}
