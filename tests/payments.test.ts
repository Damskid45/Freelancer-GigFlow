import {describe,it,expect} from "vitest";
import {PaymentsService} from "../backend/src/domains/payments/payments.service.js";
describe("payments",()=>{const service=new PaymentsService();it("calculates platform fees by order size",()=>{expect(service.fees({amount:10000})).toBe(1000);expect(service.fees({amount:100000})).toBe(8000)});it("requires authorization before capture",()=>{expect(()=>service.capture({status:"created",amount:100})).toThrow()})});
