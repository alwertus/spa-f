import {sendGetMsg} from "../../../shared/api/SendMsg";
import toast from "react-hot-toast";
import {URL_USER} from "../const/const";

export const LoadUsers = (setUsers) => {
    sendGetMsg(
        URL_USER,
        {},
        (response) => {
            setUsers(response);
        },
        (error) => {
            toast.error("error getting list of users:", error);
        }
    );
}