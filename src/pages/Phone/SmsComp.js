import style from "./Phone.module.css";

export const SmsComp = ({sms}) => {
    return <div className={style.sms}>
        <div className={style.smsSender}>{sms.id}</div>
        <div className={style.smsSender}>{!!sms.created ? (new Date(sms.created)).toString() : "DATE_NULL"}</div>
        <div className={style.smsSender}>{sms.sender}</div>
        <div className={style.smsText}>{sms.message}</div>
    </div>
}