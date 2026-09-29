export class PaymentsService {
  authorization(input:any):any { return input.status==="created" && input.amount>0 && input.currency.length===3; }
  capture(input:any):any { if(input.status!=="authorized") throw new Error("Payment must be authorized first"); return {status:"captured",capturedAmount:input.amount}; }
  refunds(input:any):any { if(input.status!=="captured") throw new Error("Only captured payments can be refunded"); return Math.min(input.amount,input.requested); }
  ledger(input:any):any { const debit=input.direction==="debit"?-Math.abs(input.amount):Math.abs(input.amount); return {signedAmount:debit,balance:input.balance+debit}; }
  fees(input:any):any { const rate=input.amount>=100000?0.08:0.1; return Math.round(input.amount*rate); }
  webhooks(input:any):any { return input.signature===input.expected && input.eventId.length>8; }
}
