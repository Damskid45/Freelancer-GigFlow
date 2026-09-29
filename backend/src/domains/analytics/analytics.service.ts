export class AnalyticsService {
  events(input:any):any { return {name:input.name,entity:input.entity,occurredAt:new Date().toISOString(),properties:input.properties}; }
  funnels(input:any):any { return input.steps.map((step:string)=>({step,users:input.events.filter((e:{step:string})=>e.step===step).length})); }
  sellerInsights(input:any):any { return {conversion:input.views?input.orders/input.views:0,repeatRate:input.buyers?input.repeatBuyers/input.buyers:0}; }
  buyerInsights(input:any):any { return {spend:input.orders.reduce((s:number,o:{total:number})=>s+o.total,0),averageOrder:input.orders.length?input.orders.reduce((s:number,o:{total:number})=>s+o.total,0)/input.orders.length:0}; }
  exports(input:any):any { return input.rows.map((row:Record<string,unknown>)=>input.fields.map((f:string)=>String(row[f]??"")).join("\t")).join("\n"); }
}
