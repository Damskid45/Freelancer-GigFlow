export class CouponsService {
  eligibility(input:any):any { return input.active && input.startsAt<=input.now && input.endsAt>input.now && input.spend>=input.minimumSpend && input.redemptions<input.limit; }
  limits(input:any):any { return input; }
  redemption(input:any):any { if(input.remaining<=0) throw new Error("Coupon usage limit reached"); return {remaining:input.remaining-1, applied:true}; }
  expiry(input:any):any { return new Date(input.endsAt).getTime()<=Date.now(); }
  campaigns(input:any):any { return input; }
}
