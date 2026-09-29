import { pool } from "../../db.js";
import type { UsersRecord, UsersQuery } from "./users.types.js";

export class UsersRepository {
  async findById(id:string):Promise<UsersRecord|null>{
    const result=await pool.query("select * from users where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:UsersQuery):Promise<UsersRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from users order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as UsersRecord[];
  }
}
