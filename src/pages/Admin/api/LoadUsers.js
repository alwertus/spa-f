import {sendGetMsg} from "../../../shared/api/SendMsg";
import toast from "react-hot-toast";
import {URL_ADMIN_USER} from "../../../shared/const/Constans";

export const LoadUsers = (setUsers) => {
    sendGetMsg(
        URL_ADMIN_USER,
        {},
        (response) => {
            setUsers(response);
        },
        (error) => {
            toast.error("error getting list of users:", error);
        }
    );
}