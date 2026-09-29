import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID, scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

export type Gig = {
  id: string; title: string; summary: string; price: number; rating: number; reviews: number;
  deliveryDays: number; seller: string; category: string; tags: string[]; featured?: boolean;
  image: string; description: string; sellerId: string; categoryId: string;
};
export type Order = { id:string; title:string; seller:string; status:string; amount:number; due:string; progress:number; gigId:string; sellerId:string; buyerId:string };
export type Chat = { id:string; seller:string; title:string; preview:string; time:string; messages:{id:string;sender:"buyer"|"seller";body:string;createdAt:string}[] };
export type Brief = { id:string; title:string; description:string; category:string; budget:number; deadline:string; skills:string[]; status:string; createdAt:string; buyerId:string };
export type User = { id:string; name:string; email:string; passwordHash?:string; avatarData?:string; provider:"password"|"google"; role:"buyer"|"seller"|"admin"; emailVerified:boolean; idVerificationStatus:"not_started"|"pending"|"verified"|"rejected"; idVerificationSubmittedAt?:string; profile:{bio:string;location:string;skills:string[]}; createdAt:string };
export type PaymentMethod = { id:string; type:"card"|"bank"; label:string; last4:string; holder:string; expiry?:string; bankName?:string; isDefault:boolean; createdAt:string };

type Store = { categories:string[]; gigs:Gig[]; orders:Order[]; chats:Chat[]; favorites:string[]; briefs:Brief[]; users:User[]; paymentMethods:PaymentMethod[] };
const dataDir = path.resolve(process.cwd(), ".data");
const dataFile = path.join(dataDir, "store.json");

const categories = ['Web Development','Design & Creative','Writing & Translation','Digital Marketing','Video & Animation','Music & Audio','Programming & Tech','Business'];
const seedGigs: Gig[] = [
 {id:'web-01',title:'I will build a modern full-stack web application',summary:'React, TypeScript, Node.js and PostgreSQL with a clean production-ready architecture.',price:85000,rating:4.9,reviews:128,deliveryDays:7,seller:'Demo Studio',category:'Web Development',tags:['React','Node.js','TypeScript'],featured:true,image:'WEB',description:'A complete responsive web application with reusable components, secure APIs, database integration, validation and deployment guidance.',sellerId:'seller-demo',categoryId:'cat-web'},
 {id:'design-01',title:'I will design a premium brand identity for your business',summary:'Logo, typography, color direction and a practical brand starter kit.',price:65000,rating:4.8,reviews:94,deliveryDays:5,seller:'Maya Studio',category:'Design & Creative',tags:['Branding','Logo','Figma'],featured:true,image:'BRAND',description:'A focused visual identity package designed to make your business look consistent and memorable across digital touchpoints.',sellerId:'seller-maya',categoryId:'cat-design'},
 {id:'copy-01',title:'I will write conversion-focused website copy',summary:'Clear landing pages, product copy and calls to action written for real customers.',price:42000,rating:4.9,reviews:76,deliveryDays:4,seller:'Tobi Writes',category:'Writing & Translation',tags:['Copywriting','SEO','Landing page'],image:'COPY',description:'Research-led copy for your homepage, service pages and product sections with a strong focus on clarity and conversion.',sellerId:'seller-tobi',categoryId:'cat-writing'},
 {id:'marketing-01',title:'I will build your social media content strategy',summary:'A practical 30-day content plan with hooks, themes and publishing structure.',price:55000,rating:4.7,reviews:61,deliveryDays:6,seller:'Nia Digital',category:'Digital Marketing',tags:['Social Media','Strategy','Content'],image:'SOCIAL',description:'A tailored content strategy covering audience themes, weekly pillars, hooks, content formats and measurement ideas.',sellerId:'seller-nia',categoryId:'cat-marketing'},
 {id:'video-01',title:'I will edit professional short-form videos',summary:'Fast-paced reels and social videos with captions, cuts and polished pacing.',price:38000,rating:4.8,reviews:113,deliveryDays:3,seller:'FrameLab',category:'Video & Animation',tags:['Reels','Editing','Captions'],image:'VIDEO',description:'Short-form editing optimized for social platforms, including clean cuts, subtitles, pacing and basic motion treatment.',sellerId:'seller-frame',categoryId:'cat-video'},
 {id:'api-01',title:'I will build and document your REST API',summary:'Typed Node.js APIs with validation, authentication and clear documentation.',price:70000,rating:5,reviews:42,deliveryDays:6,seller:'DevForge',category:'Programming & Tech',tags:['API','Node.js','Backend'],featured:true,image:'API',description:'Well-structured backend endpoints with validation, error handling, authorization patterns and API documentation.',sellerId:'seller-dev',categoryId:'cat-tech'},
 {id:'music-01',title:'I will mix and master your podcast episode',summary:'Clean dialogue, balanced levels and delivery-ready audio for your show.',price:30000,rating:4.9,reviews:39,deliveryDays:2,seller:'SoundHouse',category:'Music & Audio',tags:['Podcast','Audio','Mixing'],image:'AUDIO',description:'Dialogue cleanup, balancing, basic mastering and export for podcast publishing.',sellerId:'seller-sound',categoryId:'cat-music'},
 {id:'business-01',title:'I will create a professional business presentation',summary:'A persuasive slide deck with clear structure and polished visual hierarchy.',price:48000,rating:4.8,reviews:58,deliveryDays:4,seller:'SlideCraft',category:'Business',tags:['PowerPoint','Pitch Deck','Presentation'],image:'DECK',description:'A professional presentation structured around your audience, message and desired outcome.',sellerId:'seller-slide',categoryId:'cat-business'}
];
const seedOrders: Order[] = [
 {id:'GF-1042',title:'Landing page redesign',seller:'Demo Studio',status:'In progress',amount:85000,due:'Tomorrow',progress:72,gigId:'web-01',sellerId:'seller-demo',buyerId:'demo-buyer'},
 {id:'GF-1031',title:'Product launch copy',seller:'Tobi Writes',status:'Delivered',amount:42000,due:'Review needed',progress:100,gigId:'copy-01',sellerId:'seller-tobi',buyerId:'demo-buyer'},
 {id:'GF-1017',title:'Brand identity kit',seller:'Maya Studio',status:'Completed',amount:120000,due:'Finished',progress:100,gigId:'design-01',sellerId:'seller-maya',buyerId:'demo-buyer'}
];
const seedChats: Chat[] = [
 {id:'chat-1',seller:'Maya Studio',title:'Brand identity kit',preview:'Can you confirm the final color direction?',time:'2m',messages:[{id:'m1',sender:'seller',body:'Hi there! I have a quick update on the project.',createdAt:new Date().toISOString()},{id:'m2',sender:'seller',body:'Can you confirm the final color direction?',createdAt:new Date().toISOString()}]},
 {id:'chat-2',seller:'Tobi Writes',title:'Product launch copy',preview:'I have uploaded the revised copy.',time:'24m',messages:[]},
 {id:'chat-3',seller:'DevForge',title:'REST API project',preview:'The API documentation is ready.',time:'2h',messages:[]},
 {id:'chat-4',seller:'FrameLab',title:'Short-form video',preview:'Thanks! I will send the next cut tomorrow.',time:'1d',messages:[]}
];
let store: Store = {categories, gigs:seedGigs, orders:seedOrders, chats:seedChats, favorites:[], briefs:[], users:[], paymentMethods:[]};
const sessions = new Map<string,string>();
const resetTokens = new Map<string,{userId:string;expiresAt:number}>();
function hashPassword(password:string){const salt=randomBytes(16);const key=scryptSync(password,salt,64);return `${salt.toString("hex")}:${key.toString("hex")}`;}
function verifyPassword(password:string, encoded:string){const [saltHex,keyHex]=encoded.split(":");if(!saltHex||!keyHex)return false;const key=scryptSync(password,Buffer.from(saltHex,"hex"),64);const expected=Buffer.from(keyHex,"hex");return expected.length===key.length&&timingSafeEqual(key,expected);}
function publicUser(user:User){const {passwordHash,...safe}=user;return safe;}
export function getUserById(id:string){return store.users.find(u=>u.id===id);}
export function getUserFromToken(token:string|undefined){const id=token?sessions.get(token):undefined;return id?getUserById(id):undefined;}
export async function registerGoogleUser(input:{name:string;email:string;avatarData?:string}){const email=input.email.trim().toLowerCase();let user=store.users.find(u=>u.email===email);if(user){user.provider="google";user.emailVerified=true;if(input.avatarData)user.avatarData=input.avatarData;await persist();return user;}user={id:`google:${email}`,name:input.name.trim(),email,avatarData:input.avatarData,provider:"google",role:"buyer",emailVerified:true,idVerificationStatus:"not_started",profile:{bio:"",location:"Nigeria",skills:[]},createdAt:new Date().toISOString()};store.users.push(user);await persist();return user;}
export function createSession(userId:string){const token=randomUUID();sessions.set(token,userId);const user=getUserById(userId);if(!user)throw new Error("User not found");return {token,user:publicUser(user)};}
export async function registerUser(input:{name:string;email:string;password:string}){const email=input.email.trim().toLowerCase();if(store.users.some(u=>u.email===email))throw new Error("An account with that email already exists");if(input.password.length<8)throw new Error("Password must be at least 8 characters");const user:User={id:randomUUID(),name:input.name.trim(),email,passwordHash:hashPassword(input.password),provider:"password",role:"buyer",emailVerified:false,idVerificationStatus:"not_started",profile:{bio:"",location:"Nigeria",skills:[]},createdAt:new Date().toISOString()};store.users.push(user);await persist();return publicUser(user);}
export async function loginUser(email:string,password:string){const user=store.users.find(u=>u.email===email.trim().toLowerCase());if(!user||!user.passwordHash||!verifyPassword(password,user.passwordHash))throw new Error("Invalid email or password");return createSession(user.id);}
export async function issueResetToken(email:string){const user=store.users.find(u=>u.email===email.trim().toLowerCase());if(!user)return {sent:true};const token=randomUUID();resetTokens.set(token,{userId:user.id,expiresAt:Date.now()+15*60*1000});return {sent:true,resetToken:token};}
export async function resetPassword(token:string,password:string){const item=resetTokens.get(token);if(!item||item.expiresAt<Date.now())throw new Error("Reset link is invalid or expired");if(password.length<8)throw new Error("Password must be at least 8 characters");const user=getUserById(item.userId);if(!user)throw new Error("Account not found");user.passwordHash=hashPassword(password);resetTokens.delete(token);await persist();return {ok:true};}
export async function updateUser(id:string,input:{name?:string;bio?:string;location?:string;skills?:string[];avatarData?:string}){const user=getUserById(id);if(!user)throw new Error("User not found");if(input.name!==undefined)user.name=input.name.trim();if(input.bio!==undefined)user.profile.bio=input.bio;if(input.location!==undefined)user.profile.location=input.location;if(input.skills!==undefined)user.profile.skills=input.skills;if(input.avatarData!==undefined)user.avatarData=input.avatarData;await persist();return publicUser(user);}
export async function submitIdVerification(id:string,documentType:string,fileName:string){const user=getUserById(id);if(!user)throw new Error("User not found");user.idVerificationStatus="pending";user.idVerificationSubmittedAt=new Date().toISOString();await persist();return {status:user.idVerificationStatus,documentType,fileName,notice:"Your ID has been submitted for review. Production deployments should use encrypted storage and a verified KYC provider."};}
export function getPaymentMethods(userId:string){return store.paymentMethods.filter(m=>m.id.startsWith(`${userId}:`));}
export async function addPaymentMethod(userId:string,input:{type:"card"|"bank";holder:string;last4:string;expiry?:string;bankName?:string}){const existing=getPaymentMethods(userId);if(existing.length===0){}const method:PaymentMethod={id:`${userId}:${randomUUID()}`,type:input.type,label:input.type==="card"?"Card":"Bank account",last4:input.last4.slice(-4),holder:input.holder,expiry:input.expiry,bankName:input.bankName,isDefault:existing.length===0,createdAt:new Date().toISOString()};store.paymentMethods.push(method);await persist();return method;}
export async function removePaymentMethod(userId:string,id:string){const idx=store.paymentMethods.findIndex(m=>m.id===id&&m.id.startsWith(`${userId}:`));if(idx<0)throw new Error("Payment method not found");store.paymentMethods.splice(idx,1);const remaining=getPaymentMethods(userId);if(remaining.length&&!remaining.some(m=>m.isDefault))remaining[0].isDefault=true;await persist();return {ok:true};}

export async function initStore(){
  try { const raw=await fs.readFile(dataFile,"utf8"); store=JSON.parse(raw) as Store; }
  catch { await persist(); }
}
async function persist(){ await fs.mkdir(dataDir,{recursive:true}); await fs.writeFile(dataFile,JSON.stringify(store,null,2),"utf8"); }
export function listGigs(search="",category="",sort="Recommended"){
 let items=store.gigs.filter(g=>g.title.toLowerCase().includes(search.toLowerCase()) || g.summary.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t=>t.toLowerCase().includes(search.toLowerCase())));
 if(category && category!=="All") items=items.filter(g=>g.category===category);
 if(sort==="Rating") items.sort((a,b)=>b.rating-a.rating); else if(sort==="Price: low") items.sort((a,b)=>a.price-b.price);
 return items;
}
export function getGig(id:string){return store.gigs.find(g=>g.id===id);}
export function getOrders(){return store.orders;}
export function getChats(){return store.chats;}
export function getFavorites(){return store.gigs.filter(g=>store.favorites.includes(g.id));}
export function getBriefs(){return store.briefs;}
export async function createBrief(input:{title:string;description:string;category:string;budget?:number;deadline?:string;skills?:string[]}){
 const brief: Brief={id:`BR-${Math.floor(1000+Math.random()*9000)}`,title:input.title,description:input.description,category:input.category,budget:Number(input.budget||0),deadline:input.deadline||"Flexible",skills:input.skills||[],status:"Open",createdAt:new Date().toISOString(),buyerId:"demo-buyer"};
 store.briefs.unshift(brief); await persist(); return brief;
}
export async function toggleFavorite(gigId:string){const i=store.favorites.indexOf(gigId);if(i>=0)store.favorites.splice(i,1);else store.favorites.push(gigId);await persist();return {saved:store.favorites.includes(gigId),favorites:getFavorites()};}
export async function createGig(input:{title:string;category:string;summary:string;tags?:string[];price?:number;deliveryDays?:number;description?:string}){
 const gig: Gig={id:randomUUID(),title:input.title,summary:input.summary,price:Number(input.price||25000),rating:0,reviews:0,deliveryDays:Number(input.deliveryDays||7),seller:'Demo Studio',category:input.category,tags:input.tags||[],image:'NEW',description:input.description||input.summary,sellerId:'seller-demo',categoryId:`cat-${input.category.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`};
 store.gigs.unshift(gig);await persist();return gig;
}
export async function createOrder(gigId:string,buyerId="demo-buyer"){const gig=getGig(gigId);if(!gig)throw new Error('Gig not found');const order:Order={id:`GF-${Math.floor(1000+Math.random()*9000)}`,title:gig.title,seller:gig.seller,status:'In progress',amount:gig.price,due:`${gig.deliveryDays} days`,progress:0,gigId:gig.id,sellerId:gig.sellerId,buyerId};store.orders.unshift(order);await persist();return order;}
export async function sendMessage(chatId:string,body:string){const chat=store.chats.find(c=>c.id===chatId);if(!chat)throw new Error('Conversation not found');const msg={id:randomUUID(),sender:'buyer' as const,body,createdAt:new Date().toISOString()};chat.messages.push(msg);chat.preview=body;chat.time='now';await persist();return msg;}
