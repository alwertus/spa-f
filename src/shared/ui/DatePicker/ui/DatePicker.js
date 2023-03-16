import React, {useEffect, useState} from 'react';
import style from './DatePicker.module.css';
import {getMonthDates} from "../lib/dateHelper";
import {DrawDates} from "./DrawDates";
import {DrawMonths} from "./DrawMonths";
import {DrawYear} from "./DrawYear";
import toast from "react-hot-toast";

export const DatePicker = ({date, setDate}) => {
    const [showPicker, setShowPicker] = useState(false)
    const [dates, setDates] = useState(getMonthDates(date))
    const [showMode, setShowMode] = useState(0)

    function close(isOpen = false) {
        setShowPicker(isOpen)
        if (!isOpen) {
            setShowMode(0)
        }
    }

    useEffect(() => {setDates(getMonthDates(date))}, [date])

    return <div className={style.wrapper}>
        <div className={style.dateText}
             onClick={() => {close(!showPicker)}}
             onDoubleClick={() => {
                 setDate(new Date())
                 close()
             }}>
            {date.toLocaleDateString()}
        </div>

        {showPicker &&
            <div className={style.pickDialogue}>
                <div className={style.line}>
                    <div className={style.dateText} onClick={() => {setShowMode(0)}}>{date.getDate()}</div>
                    <div className={style.dateText} onClick={() => {setShowMode(1)}}>{date.toLocaleString('en-us', {month:'short'})}</div>
                    <div className={style.dateText} onClick={() => {setShowMode(2)}}>{date.getFullYear()}</div>
                </div>

                {showMode === 0 && <DrawDates
                    dates={dates}
                    onClickHandler={(e) => {
                        let newDate = new Date(date.getFullYear(), date.getMonth(), e)
                        setDate(newDate)
                        close()
                    }}/>}

                {showMode === 1 && <DrawMonths
                    onClickHandler={(e) => {
                        let newDate = new Date(date.getFullYear(), e.id, 1)
                        setDate(newDate)
                        setShowMode(0)
                    }}
                />}
                {showMode === 2 && <DrawYear
                    defaultYear={date.getFullYear()}
                    onClickHandler={(e) => {
                        console.log("newValue=" + e)
                        if (!e) {
                            toast.error("Year cannot be empty")
                            return
                        }
                        if (isNaN(e)) {
                            toast.error("Year must be number")
                            return
                        }
                        if (Number(e) < 2000 || Number(e) > 2100) {
                            toast.error("Year must be between 2000 and 2100")
                            return
                        }

                        let newDate = new Date(e, 0, 1)
                        setDate(newDate)
                        setShowMode(1)
                    }}
                />}


            </div>}
    </div>
}
