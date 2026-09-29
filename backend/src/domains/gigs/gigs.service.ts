export class GigsService {
  publishing(input:any):any { return input.title.length>=8 && input.description.length>=120 && input.categoryId.length>0 && input.deliveryDays>0 && input.price>0; }
  pricing(input:any):any { const minimum=Math.max(5, input.amount); const rushFee=input.rush ? Math.ceil(minimum*0.2) : 0; return {subtotal:minimum, rushFee, total:minimum+rushFee}; }
  requirements(input:any):any { return input.items.filter((x:{required:boolean})=>x.required).every((x:{answer?:string})=>Boolean(x.answer?.trim())); }
  packages(input:any):any { return input.packages.map((p:{name:string,price:number,days:number})=>({...p,valid:p.price>0&&p.days>0&&p.name.trim().length>2})); }
  availability(input:any):any { return input.capacity>0 && input.pausedDates.every((date:string)=>!input.requestedDates.includes(date)); }
  ranking(input:any):any { const daysSince=Math.max(0,Math.floor((Date.now()-new Date(input.updatedAt).getTime())/86400000)); const freshness=Math.max(0,30-daysSince); const quality=Math.min(100,input.rating*20); return freshness*0.35+quality*0.65; }
}
