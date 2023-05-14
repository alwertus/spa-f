import React, {useState} from 'react';
import style from './CashMain.module.css';
import {UserData} from "./delme/Data";
import {CashMainChart} from "../../../entities/CashMainChart";
import {CashOperationAddLine} from "../../../entities/CashOperationAddLine";
import {CashOperationLine} from "../../../entities/CashOperationLine";
import {elementComparatorByName} from "../../../shared/lib/Comparator";

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
        {Operation.list
            .sort((a, b) => {
                if (!a['product'])
                    return -1;
                if (!b['product'])
                    return 1;
                return elementComparatorByName(a['product'], b['product'])
            })
            .map(e => <CashOperationLine
            key={e.id}
            item={e}
            Operation={Operation}
            Cell={Cell}
        />)}


        {selectedDate && <div>Подробности по дате: {selectedDate}</div>}
    </div>
}
