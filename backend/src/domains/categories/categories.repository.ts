import { pool } from "../../db.js";
import type { CategoriesRecord, CategoriesQuery } from "./categories.types.js";

export class CategoriesRepository {
  async findById(id:string):Promise<CategoriesRecord|null>{
    const result=await pool.query("select * from categories where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:CategoriesQuery):Promise<CategoriesRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from categories order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as CategoriesRecord[];
  }
}
