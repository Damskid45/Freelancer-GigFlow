import { pool } from "../../db.js";
import type { PaymentsRecord, PaymentsQuery } from "./payments.types.js";

export class PaymentsRepository {
  async findById(id:string):Promise<PaymentsRecord|null>{
    const result=await pool.query("select * from payments where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:PaymentsQuery):Promise<PaymentsRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from payments order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as PaymentsRecord[];
  }
}
