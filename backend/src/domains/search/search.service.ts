export class SearchService {
  tokenization(input:any):any { return input.trim().toLocaleLowerCase().normalize("NFKD").replace(/[^\p{Letter}\p{Number}]+/gu," ").trim().split(/\s+/).filter(Boolean); }
  filters(input:any):any { return input.gigs.filter((gig:{price:number,rating:number,deliveryDays:number})=>(!input.maxPrice||gig.price<=input.maxPrice)&&(!input.minRating||gig.rating>=input.minRating)&&(!input.maxDays||gig.deliveryDays<=input.maxDays)); }
  facets(input:any):any { return input.values.reduce((acc:Record<string,number>,value:string)=>(acc[value]=(acc[value]??0)+1,acc),{}); }
  ranking(input:any):any { const daysSince=Math.max(0,Math.floor((Date.now()-new Date(input.updatedAt).getTime())/86400000)); const freshness=Math.max(0,30-daysSince); const quality=Math.min(100,input.rating*20); return freshness*0.35+quality*0.65; }
  autocomplete(input:any):any { return input.terms.filter((term:string)=>term.toLowerCase().startsWith(input.prefix.toLowerCase())).slice(0,8); }
}
