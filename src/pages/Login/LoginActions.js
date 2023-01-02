import {sendMsg} from "../../common/SendMsg";


export function signIn(login, password, errorHandler) {
    sendMsg("POST",
        "user/login",
        {"login": login, "password": password},
        () => {},
        errorHandler
    )
}