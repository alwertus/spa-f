import style from "./Sms.module.css";
import {ButtonComp} from "../../shared/ui/Button/ButtonComp";
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
        <div className={style.blockSms}>
            <div className={style.line}>
                <div className={style.smsSender}>{!!sms['created'] ? (new Date(sms['created'])).toLocaleString() : "no_date"}</div>
                <div className={style.smsSender}>{sms['number']}</div>
            </div>
            <div className={style.line}>
                <div className={style.smsText}>{sms['message']}</div>
            </div>
        </div>

        <div className={style.blockActions}>
            {!sms['read'] && <ButtonComp
                text={"read"}
                onClick={readSms}
            />}
            <ButtonComp
                text={"DEL"}
                onClick={deleteHandler}
            />
        </div>

    </div>
}