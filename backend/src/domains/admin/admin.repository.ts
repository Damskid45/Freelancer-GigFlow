import { pool } from "../../db.js";
import type { AdminRecord, AdminQuery } from "./admin.types.js";

export class AdminRepository {
  async findById(id:string):Promise<AdminRecord|null>{
    const result=await pool.query("select * from admin where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:AdminQuery):Promise<AdminRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from admin order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as AdminRecord[];
  }
}
