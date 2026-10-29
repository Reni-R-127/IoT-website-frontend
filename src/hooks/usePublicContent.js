import {useEffect,useState} from "react";
const API=(import.meta.env.VITE_API_BASE_URL||"http://localhost:5000/api").replace(/\/+$/,"");
export function usePublicContent(resource){
 const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
 useEffect(()=>{let active=true;fetch(`${API}/${resource}`).then(r=>{if(!r.ok)throw new Error("Could not load website content");return r.json()}).then(data=>{if(active)setItems(Array.isArray(data)?data:[])}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[resource]);
 return {items,loading,error};
}
