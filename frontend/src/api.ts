const API=import.meta.env.VITE_API_URL||"http://localhost:4000";
export async function request<T>(path:string,init:RequestInit={}):Promise<T>{const response=await fetch(`${API}${path}`,{...init,headers:{"Content-Type":"application/json",...(init.headers||{})}});if(!response.ok){const body=await response.json().catch(()=>null);throw new Error(body?.error?.message||`Request failed with ${response.status}`)}return response.json() as Promise<T>}
export type Gig={id:string;title:string;summary:string;price:number;rating:number;reviews:number;deliveryDays:number;seller:string;category:string;tags:string[];featured?:boolean;image:string;description:string};
export async function apiCategories(){return request<{items:string[]}>('/api/categories')}
export async function apiGigs(search='',category='',sort='Recommended'){return request<{items:Gig[];total:number}>(`/api/gigs?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}`)}
export async function apiGig(id:string){return request<Gig>(`/api/gigs/${encodeURIComponent(id)}`)}
export async function apiOrders(){return request<{items:any[]}>('/api/orders')}
export async function apiMessages(){return request<{items:any[]}>('/api/messages')}
export async function apiFavorites(){return request<{items:Gig[]}>('/api/favorites')}
export async function apiToggleFavorite(id:string){return request<{saved:boolean;favorites:Gig[]}>(`/api/favorites/${encodeURIComponent(id)}`,{method:'POST'})}
export async function apiCreateOrder(gigId:string){return request<any>('/api/orders',{method:'POST',body:JSON.stringify({gigId})})}
export async function apiSendMessage(chatId:string,body:string){return request<any>(`/api/messages/${encodeURIComponent(chatId)}`,{method:'POST',body:JSON.stringify({body})})}
export async function apiCreateGig(input:{title:string;category:string;summary:string;tags?:string[];price?:number;deliveryDays?:number;description?:string}){return request<Gig>('/api/gigs',{method:'POST',body:JSON.stringify(input)})}
