import { HTTP_URL } from "../App/Slices/baseurl";
import axios from "axios";
import { DraftList } from "../App/Types/champ-select-types";

const get = async (endpoint:string) => {
    const res = await axios.get(`${HTTP_URL}/${endpoint}`)
    return res.data
}

export const getDraftList:Promise<DraftList> = get('')

