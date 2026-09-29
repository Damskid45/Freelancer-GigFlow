import {describe,it,expect} from "vitest";
import {OrdersService} from "../backend/src/domains/orders/orders.service.js";
describe("order lifecycle",()=>{const service=new OrdersService();it("allows delivered orders to enter revision",()=>{expect(service.lifecycle({from:"delivered",to:"revision"})).toBe(true)});it("blocks completed orders from going back",()=>{expect(service.lifecycle({from:"completed",to:"in_progress"})).toBe(false)});it("accepts a valid delivery",()=>{expect(service.delivery({kind:"link",url:"https://example.com/result"})).toBe(true)})});
