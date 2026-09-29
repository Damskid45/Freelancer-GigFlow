import { pool } from "../../db.js";
import type { CouponsRecord, CouponsQuery } from "./coupons.types.js";

export class CouponsRepository {
  async findById(id:string):Promise<CouponsRecord|null>{
    const result=await pool.query("select * from coupons where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:CouponsQuery):Promise<CouponsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from coupons order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as CouponsRecord[];
  }
}
