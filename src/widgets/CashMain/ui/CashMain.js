import React, {useState} from 'react';
import style from './CashMain.module.css';
import {UserData} from "./delme/Data";
import {CashMainChart} from "../../../entities/CashMainChart";

export const CashMain = () => {
    // const [selectedDate, setSelectedDate] = useState(null);

    return <div className={style.wrapper}>
        <div style={{width: 700}}>
            <CashMainChart data={UserData}/>
        </div>
        {/*{selectedDate && <div>Подробности по дате: {selectedDate}</div>}*/}
    </div>
}
