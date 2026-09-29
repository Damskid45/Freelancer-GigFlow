import { pool } from "../../db.js";
import type { FilesRecord, FilesQuery } from "./files.types.js";

export class FilesRepository {
  async findById(id:string):Promise<FilesRecord|null>{
    const result=await pool.query("select * from files where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:FilesQuery):Promise<FilesRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from files order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as FilesRecord[];
  }
}
