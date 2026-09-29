import { pool } from "../../db.js";
import type { DisputesRecord, DisputesQuery } from "./disputes.types.js";

export class DisputesRepository {
  async findById(id:string):Promise<DisputesRecord|null>{
    const result=await pool.query("select * from disputes where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:DisputesQuery):Promise<DisputesRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from disputes order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as DisputesRecord[];
  }
}
