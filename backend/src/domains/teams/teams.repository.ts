import { pool } from "../../db.js";
import type { TeamsRecord, TeamsQuery } from "./teams.types.js";

export class TeamsRepository {
  async findById(id:string):Promise<TeamsRecord|null>{
    const result=await pool.query("select * from teams where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:TeamsQuery):Promise<TeamsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from teams order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as TeamsRecord[];
  }
}
