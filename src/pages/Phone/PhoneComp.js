import React, {useEffect, useState} from "react";
import style from "./Phone.module.css";
import {SmsComp} from "./SmsComp";
import {getSmsList, sendSms} from "./PhoneActions";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {ReactComponent as RefreshIcon} from "../../common/img/refresh.svg"
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import toast from "react-hot-toast";

export const PhoneComp = () => {
    const [smsList, setSmsList] = useState([])
    const [phoneNumber, setPhoneNumber] = useState("")
    const [smsText, setSmsText] = useState("")

    useEffect(() => {
        if (!smsList || smsList.length === 0)
            getSmsList(setSmsList)
    }, [])

    return <div className={style.wrapper}>

        <div className={style.panelActions}>
            <div className={style.element}><InputTextComp defaultText={phoneNumber} title={"Number"} acceptChanges={setPhoneNumber}/></div>
            <div className={style.element}><InputTextComp defaultText={smsText} title={"Message"} acceptChanges={setSmsText}/></div>
            <ButtonComp
                tooltipText={"Send message"}
                onClick={() => {sendSms(phoneNumber, smsText, () => {
                    toast.success("Sent")
                    setPhoneNumber("")
                    setSmsText("")
                    getSmsList(setSmsList)
                })}}
                text={"Send"}
            />
        </div>

        <div className={style.panelActions}>
            <ButtonComp
                tooltipText={"Refresh sms list"}
                onClick={() => getSmsList(setSmsList)}
                icon={<RefreshIcon/>}
            />
        </div>

        <div className={style.smsList}>
            {smsList
                .sort((a, b) => b['created'] - a['created'] - (!!b['read'] ? 999999999 : 0) + (!!a['read'] ? 999999999 : 0))
                .map(e => <SmsComp key={e.id} sms={e} updateSmsHandler={() => getSmsList(setSmsList)}/>)
            }
        </div>

    </div>
}