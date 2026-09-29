export class SettingsService {
  account(input:any):any { return {theme:input.theme,locale:input.locale,currency:input.currency}; }
  security(input:any):any { return {mfa:input.mfa,sessionTimeout:Math.max(15,input.sessionTimeout)}; }
  locale(input:any):any { return /^[a-z]{2}(-[A-Z]{2})?$/.test(input.locale); }
  notifications(input:any):any { return input; }
  appearance(input:any):any { return ["light","dark","system"].includes(input.theme); }
}
