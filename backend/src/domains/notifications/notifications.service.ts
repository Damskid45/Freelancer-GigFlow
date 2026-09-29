export class NotificationsService {
  preferences(input:any):any { return {locale:input.locale||"en-NG",currency:input.currency||"NGN",digest:input.digest??true}; }
  inApp(input:any):any { return {title:input.title.slice(0,90),body:input.body.slice(0,240),priority:input.priority}; }
  emailDigest(input:any):any { return input.items.filter((x:{read:boolean})=>!x.read).slice(0,50); }
  routing(input:any):any { return input.channels.filter((channel:string)=>input.allowed.includes(channel)); }
  templates(input:any):any { return input.template.replace(/\{\{(\w+)\}\}/g,(_:string,key:string)=>String(input.values[key]??"")); }
}
