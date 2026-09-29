export class WalletService {
  balance(input:any):any { return input.entries.reduce((total:number,e:{amount:number,sign:"credit"|"debit"})=>total+(e.sign==="credit"?e.amount:-e.amount),0); }
  holds(input:any):any { return input.entries.filter((e:{status:string})=>e.status==="held").reduce((sum:number,e:{amount:number})=>sum+e.amount,0); }
  withdrawals(input:any):any { if(input.amount<1000) throw new Error("Minimum withdrawal is 1000"); return input.balance-input.amount>=0; }
  deposits(input:any):any { return input.providerReference.length>=10 && input.amount>0; }
  reconciliation(input:any):any { return input.providerTotal===input.ledgerTotal && input.providerCount===input.ledgerCount; }
}
