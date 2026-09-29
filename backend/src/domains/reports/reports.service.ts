export class ReportsService {
  generation(input:any):any { return input.type.length>0 && input.ownerId.length>0; }
  scheduling(input:any):any { return input.cron.trim().length>4 && input.enabled; }
  filters(input:any):any { return input.gigs.filter((gig:{price:number,rating:number,deliveryDays:number})=>(!input.maxPrice||gig.price<=input.maxPrice)&&(!input.minRating||gig.rating>=input.minRating)&&(!input.maxDays||gig.deliveryDays<=input.maxDays)); }
  csvExport(input:any):any { return input; }
}
