export class MessagingService {
  threads(input:any):any { return [...new Set(input.participantIds)].filter(Boolean).length>=2; }
  messages(input:any):any { return input.body.trim().length>0 && input.body.length<=5000; }
  attachments(input:any):any { return input.bytes<=25_000_000 && input.allowed.includes(input.mime); }
  readState(input:any):any { return input.messageIds.filter((id:string)=>input.visibleIds.includes(id)); }
  mentions(input:any):any { return [...input.body.matchAll(/@([a-z0-9_]{2,30})/gi)].map((m:RegExpMatchArray)=>m[1]); }
  moderation(input:any):any { return input.flags.filter((f:string)=>input.blockedTerms.includes(f.toLowerCase())).length===0; }
}
