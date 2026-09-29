import pg from "pg";
import { config } from "./config.js";
export const pool=new pg.Pool({connectionString:config.DATABASE_URL,max:12,idleTimeoutMillis:30000});
export async function transaction<T>(work:(client:pg.PoolClient)=>Promise<T>):Promise<T>{const client=await pool.connect();try{await client.query("BEGIN");const value=await work(client);await client.query("COMMIT");return value}catch(error){await client.query("ROLLBACK");throw error}finally{client.release()}}
export async function closeDatabase(){await pool.end()}
