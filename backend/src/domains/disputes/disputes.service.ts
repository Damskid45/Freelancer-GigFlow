export class DisputesService {
  opening(input:any):any { return input.orderStatus!=="cancelled" && input.summary.trim().length>=30; }
  evidence(input:any):any { return input.items.length>0 && input.items.every((x:{type:string,hash:string})=>x.hash.length===64); }
  mediation(input:any):any { return Math.max(0,Math.min(100,input.buyerOffer/input.total*100)); }
  resolution(input:any):any { if(input.fault==="seller") return {buyer:input.total,seller:0}; if(input.fault==="buyer") return {buyer:0,seller:input.total}; return {buyer:input.total*0.5,seller:input.total*0.5}; }
  appeals(input:any):any { return input.daysSinceDecision<=7 && input.newEvidence.length>0; }
}
