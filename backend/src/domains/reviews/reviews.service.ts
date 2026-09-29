export class ReviewsService {
  submission(input:any):any { return Number.isInteger(input.rating)&&input.rating>=1&&input.rating<=5&&input.body.trim().length>=20; }
  aggregation(input:any):any { const sum=input.values.reduce((a:number,b:number)=>a+b,0); return input.values.length?Number((sum/input.values.length).toFixed(2)):0; }
  sellerScore(input:any):any { return Math.max(0,Math.min(100,input.onTime*0.4+input.response*0.2+input.rating*20*0.4)); }
  buyerFeedback(input:any):any { return {clearBrief:input.brief>=4,communication:input.communication>=4,paymentReliability:input.paymentReliability>=4}; }
  flags(input:any):any { return input.rating===1 || input.body.toLowerCase().includes("spam") || input.authorBlocked; }
}
