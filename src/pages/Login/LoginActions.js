import {sendMsg} from "../../common/SendMsg";
import toast from "react-hot-toast";


export function signIn(login, password) {
    sendMsg("POST",
        "user/login",
        {"login": login, "password": password},
        () => {},
        (msg) => toast.error(msg)
    )
}

export function register(login, email, password1, password2, clearFields) {
    if (login === null || login.trim().length === 0) {
        toast.error("Empty login")
        return
    }
    if (email === null || email.trim().length === 0) {
        toast.error("Empty email")
        return
    }
    if (password1 === null || password2 === null || password1.trim().length === 0) {
        toast.error("Empty password")
        return
    }
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