import { pool } from "../../db.js";
import type { FavoritesRecord, FavoritesQuery } from "./favorites.types.js";

export class FavoritesRepository {
  async findById(id:string):Promise<FavoritesRecord|null>{
    const result=await pool.query("select * from favorites where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:FavoritesQuery):Promise<FavoritesRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from favorites order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as FavoritesRecord[];
  }
}
