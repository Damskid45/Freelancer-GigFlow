import {describe,it,expect} from "vitest";
import {GigsService} from "../backend/src/domains/gigs/gigs.service.js";
describe("gig pricing",()=>{it("adds rush fee without mutating base amount",()=>{const service=new GigsService();expect(service.pricing({amount:10000,rush:true})).toEqual({subtotal:10000,rushFee:2000,total:12000})});it("enforces a minimum service amount",()=>{expect(new GigsService().pricing({amount:2,rush:false}).subtotal).toBe(5)})});
