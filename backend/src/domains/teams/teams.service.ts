export class TeamsService {
  membership(input:any):any { return !input.members.some((m:{userId:string})=>m.userId===input.userId); }
  roles(input:any):any { return input.role!=="owner" && input.role!=="admin"; }
  invitations(input:any):any { return input.email.includes("@") && input.expiresAt>Date.now(); }
  workspaces(input:any):any { return input.slug===input.slug.toLowerCase() && /^[a-z0-9-]+$/.test(input.slug); }
  billing(input:any):any { return input.seats*input.pricePerSeat; }
}
