import {Request,Response,NextFunction} from "express";
import {DomainError} from "./errors.js";
export function asyncHandler(fn:(req:Request,res:Response,next:NextFunction)=>Promise<unknown>){return (req:Request,res:Response,next:NextFunction)=>Promise.resolve(fn(req,res,next)).catch(next)}
export function errorHandler(error:unknown,_req:Request,res:Response,_next:NextFunction){if(error instanceof DomainError)return res.status(error.status).json({error:{code:error.code,message:error.message}});console.error(error);return res.status(500).json({error:{code:"INTERNAL_ERROR",message:"Unexpected server error"}})}
export function parsePage(query:Request["query"]){const index=Math.max(0,Number(query.page??0));const size=Math.min(100,Math.max(1,Number(query.size??20)));return {index,size}}
