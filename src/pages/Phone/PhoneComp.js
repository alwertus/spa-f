import React, {useState} from "react";
import style from "./Phone.module.css";
import {SmsComp} from "./SmsComp";
import {ReactComponent as RefreshIcon} from "../../common/img/refresh.svg"
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {getSmsList} from "./PhoneActions";

export const PhoneComp = () => {
    const [smsList, setSmsList] = useState([
        {"id":0, "sender":"+70001110000", "text":"bla bla bla ooooo 1"},
        {"id":1, "sender":"+70001110001", "text":"bla bla bla ooooo 2"},
    ])

    return <div className={style.wrapper}>

        <ButtonComp
            tooltipText={"Refresh sms list"}
            onClick={() => getSmsList(setSmsList)}
            icon={<RefreshIcon/>}
        />

        <div className={style.smsList}>
            {smsList.map(e => <SmsComp
                key={e.id}
                sms={e}
            />)}
        </div>
    </div>
}