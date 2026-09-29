import { pool } from "../../db.js";
import type { WalletRecord, WalletQuery } from "./wallet.types.js";

export class WalletRepository {
  async findById(id:string):Promise<WalletRecord|null>{
    const result=await pool.query("select * from wallet where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:WalletQuery):Promise<WalletRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from wallet order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as WalletRecord[];
  }
}
