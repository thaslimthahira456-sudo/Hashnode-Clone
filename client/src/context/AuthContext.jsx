import{createContext,useContext,useMemo,useState}from"react";import api from"../api";
const C=createContext(null);
export function AuthProvider({children}){
 const[user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("hn_user")||"null")}catch{return null}});
 async function login(email,password){const{data}=await api.post("/auth/login",{email,password});localStorage.setItem("hn_token",data.token);localStorage.setItem("hn_user",JSON.stringify(data.user));setUser(data.user);return data.user;}
 async function register(name,email,password){const{data}=await api.post("/auth/register",{name,email,password});localStorage.setItem("hn_token",data.token);localStorage.setItem("hn_user",JSON.stringify(data.user));setUser(data.user);return data.user;}
 function logout(){localStorage.removeItem("hn_token");localStorage.removeItem("hn_user");setUser(null);}
 const value=useMemo(()=>({user,login,register,logout}),[user]);return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
