import React, {useEffect, useState} from 'react';
import style from './CashOperationDetails.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {MiniModal} from "../../../shared/ui/MiniModal";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import toast from "react-hot-toast";

export const CashOperationDetails = ({updateItemHandler, item}) => {
    const rate = item['rate']
    const transferFee = item['transferFee']

    const [openDialogue, setOpenDialogue] = useState(false)
    const w = 2 + 7 * (transferFee.toString().length > rate.toString().length ? transferFee.toString().length : rate.toString().length);

    const [tempFee, setTempFee] = useState(transferFee)
    const [tempRate, setTempRate] = useState(rate)

    useEffect(() => {
        setTempFee(transferFee)
        setTempRate(rate)
    }, [item])

    useEffect(() => {
        if (!openDialogue) {
            if (tempFee !== transferFee) {
                if (isNaN(tempFee)) {
                    toast.error("Transfer Fee must be digit")
                    return
                }
                item['transferFee'] = tempFee
            }

            if (tempRate !== rate) {
                if (isNaN(tempRate)) {
                    toast.error("Rate must be digit")
                    return
                }
                item['rate'] = tempRate
            }

            if (tempFee !== transferFee || tempRate !== rate) {
                updateItemHandler(item)
            }
        }
    }, [openDialogue])

    return <div className={style.wrapper}>
        <ButtonComp
            icon={<svg viewBox={"0 0 " + w + " 24"} width={w} height={24} xmlns="http://www.w3.org/2000/svg">
                ><text x="0" y="10" fontSize={"x-small"} fill="#bf1111">-{transferFee}</text>
                <text x="0" y="20" fontSize={"x-small"} fill="#0101b7">*{rate}</text>
            </svg>}
            onClick={() => {setOpenDialogue(true)}}
        />

        {openDialogue && <MiniModal
            closeDialogueHandler={() => {
                setOpenDialogue(false)
            }}
            content={<div>
                <InputTextComp
                    title={"Transfer fee"}
                    defaultText={tempFee}
                    onKeyPress={(e) => {setTempFee(e.target.value)}}
                />
                <div className={style.free}/>
                <InputTextComp
                    title={"Rate"}
                    defaultText={tempRate}
                    onKeyPress={(e) => {setTempRate(e.target.value)}}
                />
            </div>}
        />}

    </div>
}
