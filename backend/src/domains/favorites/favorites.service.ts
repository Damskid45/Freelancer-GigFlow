export class FavoritesService {
  collections(input:any):any { return input.name.trim().length>=2 && input.name.length<=60; }
  items(input:any):any { return input.items.filter((item:{gigId:string})=>item.gigId!==input.gigId); }
  ordering(input:any):any { return [...input.items].sort((a:{position:number},b:{position:number})=>a.position-b.position); }
  privacy(input:any):any { return {publicProfile:input.publicProfile,showEmail:false,showPhone:false,discoverable:input.discoverable}; }
}
