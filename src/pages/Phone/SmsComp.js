import style from "./Sms.module.css";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import toast from "react-hot-toast";
import {deleteSms, markSmsAsRead} from "./PhoneActions";

export const SmsComp = ({sms, updateSmsHandler}) => {

    const deleteHandler = () => {
        deleteSms(sms['id'], () => {
            toast.success("Deleted")
            updateSmsHandler()
        })
    }
    const readSms = () => {
        if (sms['read'] !== true)
            markSmsAsRead(sms['id'], updateSmsHandler)
    }

    return <div className={`${style.wrapper} ${sms['read'] ? style.readTrue : style.readFalse}`}>
        <div className={style.blockSms} onClick={readSms}>
            <div className={style.line}>
                <div className={style.smsSender}>{!!sms['created'] ? (new Date(sms['created'])).toLocaleString() : "no_date"}</div>
                <div className={style.smsSender}>{sms.sender}</div>
            </div>
            <div className={style.line}>
                <div className={style.smsText}>{sms.message}</div>
            </div>
        </div>

        <div className={style.blockActions}>
            <ButtonComp
                text={"DEL"}
                onClick={deleteHandler}
            />
        </div>

    </div>
}