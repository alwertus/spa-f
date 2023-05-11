import React, {useState} from 'react';
import style from './CashMain.module.css';
import {UserData} from "./delme/Data";
import {CashMainChart} from "../../../entities/CashMainChart";
import {CashOperationAddLine} from "../../../entities/CashOperationAddLine";
import {CashOperationLine} from "../../../entities/CashOperationLine";

export const CashMain = ({Wallet, Cell, Operation}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return <div className={style.wrapper}>
        <div style={{width: 700}}>
            <CashMainChart data={UserData}
                           selectDate={setSelectedDate}
            />
        </div>
        <CashOperationAddLine
            Wallet={Wallet}
            Operation={Operation}
        />
        {Operation.list.map(e => <CashOperationLine
            key={e.id}
            item={e}
            Operation={Operation}
        />)}


        {selectedDate && <div>Подробности по дате: {selectedDate}</div>}
    </div>
}
