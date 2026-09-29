import { pool } from "../../db.js";
import type { GigsRecord, GigsQuery } from "./gigs.types.js";

export class GigsRepository {
  async findById(id:string):Promise<GigsRecord|null>{
    const result=await pool.query("select * from gigs where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:GigsQuery):Promise<GigsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from gigs order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as GigsRecord[];
  }
}
