import {sendMsg} from "../../common/SendMsg";
import toast from "react-hot-toast";

export function confirmEmail(string, setStep, setText) {
    sendMsg("GET",
        "user/emailConfirm",
        {"key" : string},
        () => {
            setStep("success")
            setText("Success. Now you can login")
            toast.success("Success. Now you can login")
        },
        (e) => {
            setStep("error")
            setText(e)
    }
    )
}