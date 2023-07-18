import {sendGetMsg} from "../../../shared/api/SendMsg";
import toast from "react-hot-toast";
import {URL_ADMIN_USER} from "../../../shared/const/Constans";

export const LoadRoles = (setRoles) => {
    sendGetMsg(
        URL_ADMIN_USER + "/roles",
        {},
        (response) => {
            setRoles(response);
        },
        (error) => {
            toast.error("error getting list of roles", error)
        }
    );
}