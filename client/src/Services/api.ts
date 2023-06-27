import { HTTP_URL } from "../App/Slices/baseurl";
import axios from "axios";
import { DraftList } from "../App/Types/champ-select-types";

const draftList:Promise<DraftList> = axios.get(`${HTTP_URL}/draftlist`,{})

draftList.then((value)=>{return (value)})

/*
export const getDraftList = async () => {
   const res = await draftList
   const data:DraftList = res.data
   return data
}*/


