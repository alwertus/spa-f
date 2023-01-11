import {sendMsg} from "../../common/SendMsg";
import toast from "react-hot-toast";
import {setLocalStorageValue} from "../../common/LocalStorage";
import {AUTH} from "../../common/Structures";

function emptyCheck(variable, errorMessage) {
    if (variable === null || variable.trim().length === 0) {
        toast.error(errorMessage)
        return false
    }
    return true
}

export function signIn(login, password, setIsAuthenticated, setUserData) {
    if (   !emptyCheck(login, "Empty login")
        || !emptyCheck(password, "Empty password"))
        return

    setLocalStorageValue(AUTH.TOKEN, null, true)
    setLocalStorageValue(AUTH.TOKEN_REFRESH, null, true)

    sendMsg("POST",
        "user/login",
        {"login": login, "password": password},
        (response) => {
            setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
            setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])
            setIsAuthenticated(true)
            setUserData(response[AUTH.USER_DATA])
        },
        (msg) => toast.error(msg)
    )
}

export function register(login, email, password1, password2, clearFields) {
    if (   !emptyCheck(login, "Empty login")
        || !emptyCheck(email, "Empty email")
        || !emptyCheck(password1, "Empty password")
        || !emptyCheck(password2, "Empty password (confirmation)"))
        return

    if (password1 !== password2) {
        toast.error("Password and Password (confirmation) do not match")
        return
    }
    sendMsg("PUT",
        "user",
        {
            "login" : login,
            "password" : password1,
            "email" : email},
        (msg) => {
            toast.success(msg['message'])
            clearFields()
        },
        (msg) => toast.error(msg)
    )
}