import {describe,it,expect} from "vitest";
import {CouponsService} from "../backend/src/domains/coupons/coupons.service.js";
describe("coupon rules",()=>{it("recognizes an active eligible coupon",()=>{const now=Date.now();expect(new CouponsService().eligibility({active:true,startsAt:now-1000,endsAt:now+10000,spend:5000,minimumSpend:1000,redemptions:2,limit:5,now})).toBe(true)});it("rejects an expired coupon",()=>{const now=Date.now();expect(new CouponsService().eligibility({active:true,startsAt:now-5000,endsAt:now-1000,spend:5000,minimumSpend:1000,redemptions:0,limit:5,now})).toBe(false)})});
