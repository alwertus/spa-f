import React, {useEffect, useState} from "react";
import style from "./Phone.module.css";
import {SmsComp} from "./SmsComp";
import {getSmsList} from "./PhoneActions";

export const PhoneComp = () => {
    const [smsList, setSmsList] = useState([])

    useEffect(() => {
        if (!smsList || smsList.length === 0)
            getSmsList(setSmsList)
    }, [])

    return <div className={style.wrapper}>

        <div className={style.smsList}>
            {smsList
                .sort((a, b) => b['created'] - a['created'] - (!!b['read'] ? 999999999 : 0) + (!!a['read'] ? 999999999 : 0))
                .map(e => <SmsComp key={e.id} sms={e} updateSmsHandler={() => getSmsList(setSmsList)}/>)
            }
        </div>

    </div>
}