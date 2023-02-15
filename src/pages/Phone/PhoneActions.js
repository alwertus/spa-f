import {sendMsg} from "../../shared/api/SendMsg";
import toast from "react-hot-toast";

export function getSmsList(setSmsList) {
    sendMsg("GET",
        "phone/sms",
        {},
        (response) => {
            setSmsList(response)
        },
        (msg) => toast.error(msg)
    )
}
export function markSmsAsRead(id, successHandler) {
    sendMsg("POST",
        "phone/sms/setRead",
        {"id": id},
        successHandler,
        (msg) => toast.error(msg)
    )
}
export function deleteSms(id, successHandler) {
    sendMsg("DELETE",
        "phone/sms",
        {"id": id},
        successHandler,
        (msg) => toast.error(msg)
    )
}
export function sendSms(phoneNumber, text, successHandler) {
    if (!phoneNumber) {
        toast.error("Enter phone number")
        return
    }

    if (!text) {
        toast.error("Enter sms message")
        return
    }

    sendMsg("POST",
        "phone/sms",
        {"number": phoneNumber,
            "message": text
        },
        successHandler,
        (msg) => toast.error(msg)
    )
}