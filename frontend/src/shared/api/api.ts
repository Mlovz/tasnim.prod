import axios from "axios";
import {TOKEN_LOCALSTORAGE_KEY} from "@/shared/conts/localstorage";

const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}` ,
    },
});