import React, {useEffect, useState} from "react";
import style from "./Phone.module.css";
import {SmsComp} from "./SmsComp";
import {getSmsList} from "./PhoneActions";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {ReactComponent as RefreshIcon} from "../../common/img/refresh.svg"

export const PhoneComp = () => {
    const [smsList, setSmsList] = useState([])

    useEffect(() => {
        if (!smsList || smsList.length === 0)
            getSmsList(setSmsList)
    }, [])

    return <div className={style.wrapper}>

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