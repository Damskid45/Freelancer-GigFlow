import { pool } from "../../db.js";
import type { OrdersRecord, OrdersQuery } from "./orders.types.js";

export class OrdersRepository {
  async findById(id:string):Promise<OrdersRecord|null>{
    const result=await pool.query("select * from orders where id=$1 limit 1",[id]);
    return result.rows[0] ?? null;
  }
  async search(query:OrdersQuery):Promise<OrdersRecord[]>{
    const offset=query.page*query.size;
    const result=await pool.query("select * from orders order by created_at desc offset $1 limit $2",[offset,query.size]);
    return result.rows as OrdersRecord[];
  }
}
