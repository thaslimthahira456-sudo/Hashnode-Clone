import axios from "axios";
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||"http://localhost:5000/api",headers:{"Content-Type":"application/json"}});
api.interceptors.request.use(c=>{const t=localStorage.getItem("hn_token");if(t)c.headers.Authorization=`Bearer ${t}`;return c;});
export const getErrorMessage=e=>e?.response?.data?.message||e?.message||"Something went wrong";
export default api;
