export class AdminService {
  moderation(input:any):any { return input.flags.filter((f:string)=>input.blockedTerms.includes(f.toLowerCase())).length===0; }
  audit(input:any):any { return {action:input.action,target:input.target,actor:input.actor,recordedAt:new Date().toISOString(),ipHash:input.ipHash}; }
  risk(input:any):any { const velocity=input.ordersLastHour>8; const amountSpike=input.amount>input.medianOrder*5; return {review:velocity||amountSpike,score:(velocity?50:0)+(amountSpike?50:0)}; }
  reports(input:any):any { return input.rows.map((row:Record<string,unknown>)=>input.columns.map((column:string)=>JSON.stringify(row[column]??"")).join(",")).join("\n"); }
  access(input:any):any { return input.required.some((role:string)=>input.roles.includes(role)); }
}
