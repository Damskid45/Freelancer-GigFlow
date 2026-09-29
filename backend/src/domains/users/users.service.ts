export class UsersService {
  profile(input:any):any { const completeness=[input.displayName,input.bio,input.avatarUrl,input.country,input.timeZone].filter(Boolean).length; return Math.round(completeness/5*100); }
  presence(input:any):any { return input.lastSeenAt && Date.now()-new Date(input.lastSeenAt).getTime()<90000; }
  preferences(input:any):any { return {locale:input.locale||"en-NG",currency:input.currency||"NGN",digest:input.digest??true}; }
  verification(input:any):any { return input.documentType!=="" && input.documentHash.length===64 && input.selfieMatch>=0.85; }
  privacy(input:any):any { return {publicProfile:input.publicProfile,showEmail:false,showPhone:false,discoverable:input.discoverable}; }
}
