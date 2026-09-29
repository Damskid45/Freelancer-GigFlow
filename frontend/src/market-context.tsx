import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {categories as seedCategories,gigs as seedGigs,orders as seedOrders,Gig} from './data';
import {apiCategories,apiCreateGig,apiCreateOrder,apiGigs,apiMessages,apiOrders,apiToggleFavorite,apiFavorites,apiSendMessage} from './api';

type Order=typeof seedOrders[number];
type Chat={id:string;seller:string;title:string;preview:string;time:string;messages:{id:string;sender:'buyer'|'seller';body:string;createdAt:string}[]};
type Ctx={categories:string[];gigs:Gig[];orders:Order[];chats:Chat[];favorites:string[];loading:boolean;refresh:()=>Promise<void>;toggleFavorite:(id:string)=>Promise<void>;createGig:(input:Parameters<typeof apiCreateGig>[0])=>Promise<Gig>;createOrder:(id:string)=>Promise<Order>;sendMessage:(id:string,body:string)=>Promise<void>};
const MarketContext=createContext<Ctx|null>(null);
export function MarketplaceProvider({children}:{children:React.ReactNode}){
 const [categories,setCategories]=useState(seedCategories);const [gigs,setGigs]=useState(seedGigs);const [orders,setOrders]=useState(seedOrders);const [chats,setChats]=useState<Chat[]>([]);const [favorites,setFavorites]=useState<string[]>([]);const [loading,setLoading]=useState(true);
 const refresh=async()=>{setLoading(true);try{const [cs,gs,os,ms,fs]=await Promise.all([apiCategories(),apiGigs(),apiOrders(),apiMessages(),apiFavorites()]);setCategories(cs.items.length?cs.items:seedCategories);setGigs(gs.items as Gig[]);setOrders(os.items as Order[]);setChats(ms.items as Chat[]);setFavorites((fs.items as Gig[]).map(g=>g.id));}catch{setGigs(seedGigs);setOrders(seedOrders);}finally{setLoading(false)}};
 useEffect(()=>{void refresh()},[]);
 const value=useMemo<Ctx>(()=>({categories,gigs,orders,chats,favorites,loading,refresh,async toggleFavorite(id){const r=await apiToggleFavorite(id);setFavorites((r.favorites as Gig[]).map(g=>g.id));},async createGig(input){const g=await apiCreateGig(input);setGigs(x=>[g as Gig,...x]);return g as Gig;},async createOrder(id){const o=await apiCreateOrder(id);setOrders(x=>[o as Order,...x]);return o as Order;},async sendMessage(id,body){await apiSendMessage(id,body);const ms=await apiMessages();setChats(ms.items as Chat[]);}}),[categories,gigs,orders,chats,favorites,loading]);
 return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}
export function useMarket(){const value=useContext(MarketContext);if(!value)throw new Error('useMarket must be used inside MarketplaceProvider');return value;}
