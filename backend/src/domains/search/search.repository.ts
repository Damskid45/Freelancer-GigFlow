import { pool } from "../../db.js";
import type { SearchRecord, SearchQuery } from "./search.types.js";

export class SearchRepository {
  async findById(id:string):Promise<SearchRecord|null>{
    const result=await pool.query("select * from search where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:SearchQuery):Promise<SearchRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from search order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as SearchRecord[];
  }
}
