import {sendPostMsg} from "../../../shared/api/SendMsg";
import {URL_USER} from "../../../features/UserDetails/const/const";
import toast from "react-hot-toast";

export const sendData = (requestData, updateUsers, setSelectedUser) => {
    sendPostMsg(
        URL_USER + "/role",
        requestData,
        (updatedUser) => {
            updateUsers();
            setSelectedUser(updatedUser);
            toast.success("success");
        },
        (error) => {
            toast.error("Error adding role: " + error);
        }
    )
}