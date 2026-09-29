import { pool } from "../../db.js";
import type { ReportsRecord, ReportsQuery } from "./reports.types.js";

export class ReportsRepository {
  async findById(id:string):Promise<ReportsRecord|null>{
    const result=await pool.query("select * from reports where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:ReportsQuery):Promise<ReportsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from reports order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as ReportsRecord[];
  }
}
