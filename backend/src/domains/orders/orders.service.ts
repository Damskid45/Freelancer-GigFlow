export class OrdersService {
  checkout(input:any):any { const platformFee=Math.round(input.subtotal*0.1); const discount=Math.min(input.discount,input.subtotal); return {platformFee,discount,total:input.subtotal+platformFee-discount}; }
  lifecycle(input:any):any { const transitions:{[key:string]:string[]}={pending:["accepted","cancelled"],accepted:["in_progress","cancelled"],in_progress:["delivered","disputed"],delivered:["revision","completed"],revision:["delivered","disputed"]}; return transitions[input.from]?.includes(input.to)===true; }
  milestones(input:any):any { const completed=input.steps.filter((step:{done:boolean})=>step.done).length; return {completed,total:input.steps.length,percent:input.steps.length?Math.round(completed/input.steps.length*100):0}; }
  delivery(input:any):any { return input.kind==="file" ? input.fileId.length>0 : input.kind==="link" ? /^https?:\/\//.test(input.url) : input.message.trim().length>0; }
  revision(input:any):any { return input.requestedCount<=input.included && input.reason.trim().length>=20; }
  completion(input:any):any { if(input.hasOpenDispute) return false; if(!input.delivered) return false; return input.accepted || input.autoReleaseAt<=Date.now(); }
}
