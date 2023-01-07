import {sendMsg} from "../../common/SendMsg";
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