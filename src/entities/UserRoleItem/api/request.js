import {sendPostMsg} from "../../../shared/api/SendMsg";
import toast from "react-hot-toast";
import {URL_ADMIN_USER} from "../../../shared/const/Constans";

export const addRole = (userName, role, updateUsers, setSelectedUser) => {
    sendPostMsg(
        URL_ADMIN_USER + "/role",
        {
            userLogin: userName,
            roleName: role,
        },
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