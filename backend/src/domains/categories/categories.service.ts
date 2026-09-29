export class CategoriesService {
  taxonomy(input:any):any { return input.nodes.every((node:{parentId?:string})=>!node.parentId || input.ids.has(node.parentId)); }
  attributes(input:any):any { return input.values.every((value:string)=>value.trim().length>0 && value.length<=80); }
  moderation(input:any):any { return input.flags.filter((f:string)=>input.blockedTerms.includes(f.toLowerCase())).length===0; }
  navigation(input:any):any { return [...input.nodes].sort((a:{position:number},b:{position:number})=>a.position-b.position); }
}
