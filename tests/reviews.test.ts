import {describe,it,expect} from "vitest";
import {ReviewsService} from "../backend/src/domains/reviews/reviews.service.js";
describe("reviews",()=>{it("accepts detailed five star feedback",()=>{expect(new ReviewsService().submission({rating:5,body:"The seller communicated clearly and delivered everything requested."})).toBe(true)});it("rejects empty feedback",()=>{expect(new ReviewsService().submission({rating:5,body:""})).toBe(false)})});
