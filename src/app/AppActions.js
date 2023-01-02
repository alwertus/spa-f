import {sendMsg} from "../common/SendMsg";
import {setLocalStorageValue} from "../common/LocalStorage";
import {AUTH} from "../common/Structures";
import toast from "react-hot-toast";

export function getUserInfo(token, setIsAuthenticated, setUserData) {
    sendMsg("POST",
        "user/update-token",
        {},
        (response) => {
            setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
            setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])
            setIsAuthenticated(true)
            setUserData(response[AUTH.USER_DATA])
        },
        (msg) => toast.error(msg)
    )
}