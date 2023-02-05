import toast from "react-hot-toast";
import {sendMsg} from "../../common/SendMsg";

export function getSpacesList(isPrivate = true, successHandler) {
    sendMsg("GET",
        "info/space",
        {"isPrivate" : isPrivate},
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function createSpace(title, access = true, successHandler) {
    sendMsg("POST",
        "info/space",
        {
            "title" : title,
            "isPrivate" : access
        },
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function updateSpace(obj, successHandler) {
    sendMsg("PUT",
        "info/space",
        obj,
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function deleteSpace(id, successHandler) {
    sendMsg("DELETE",
        "info/space",
        {"id": id},
        successHandler,
        (msg) => {toast.error(msg)}
    )
}