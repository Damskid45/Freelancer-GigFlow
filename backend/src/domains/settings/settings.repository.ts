import { pool } from "../../db.js";
import type { SettingsRecord, SettingsQuery } from "./settings.types.js";

export class SettingsRepository {
  async findById(id:string):Promise<SettingsRecord|null>{
    const result=await pool.query("select * from settings where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:SettingsQuery):Promise<SettingsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from settings order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as SettingsRecord[];
  }
}
