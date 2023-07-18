import {sendGetMsg} from "../../../shared/api/SendMsg";
import {URL_ADMIN_USER} from "../../../shared/const/Constans";
import toast from "react-hot-toast";

export const GetUsersList = (setUsers) => {
    sendGetMsg(
        URL_ADMIN_USER,
        {},
        (response) => {
            setUsers(response);
        },
        (error) => {
            toast.error("error getting list of users:" + " " + error);
        }
    );
}