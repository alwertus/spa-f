import {sendGetMsg} from "../../../shared/api/SendMsg";
import toast from "react-hot-toast";
import {URL_USER} from "../const/const";

export const LoadRoles = (setRoles) => {
    sendGetMsg(
        URL_USER + "/roles",
        {},
        (response) => {
            setRoles(response);
        },
        (error) => {
            toast.error("error getting list of roles", error)
        }
    );
}