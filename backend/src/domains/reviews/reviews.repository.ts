import { pool } from "../../db.js";
import type { ReviewsRecord, ReviewsQuery } from "./reviews.types.js";

export class ReviewsRepository {
  async findById(id:string):Promise<ReviewsRecord|null>{
    const result=await pool.query("select * from reviews where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:ReviewsQuery):Promise<ReviewsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from reviews order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as ReviewsRecord[];
  }
}
