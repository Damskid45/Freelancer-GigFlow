export class DomainError extends Error{constructor(public code:string,message:string,public status=400){super(message);this.name="DomainError"}}
export class NotFoundError extends DomainError{constructor(resource:string){super("NOT_FOUND",`${resource} was not found`,404)}}
export class ConflictError extends DomainError{constructor(message:string){super("CONFLICT",message,409)}}
export class ForbiddenError extends DomainError{constructor(message="You are not allowed to perform this action"){super("FORBIDDEN",message,403)}}
export class ValidationError extends DomainError{constructor(message:string){super("VALIDATION_ERROR",message,422)}}
