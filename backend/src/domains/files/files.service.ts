export class FilesService {
  upload(input:any):any { return input.size>0 && input.size<=100_000_000 && input.name.trim().length>0; }
  download(input:any):any { return input.ownerId===input.requesterId || input.orderId===input.requesterOrderId; }
  scanning(input:any):any { return input.verdict==="clean" && input.engineVersion.length>0; }
  retention(input:any):any { return Date.now()-new Date(input.createdAt).getTime()>input.retentionDays*86400000; }
  access(input:any):any { return input.required.some((role:string)=>input.roles.includes(role)); }
}
