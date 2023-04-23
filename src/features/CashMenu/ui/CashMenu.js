import React from 'react';
import style from './CashMenu.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {ButtonTab} from "../../../shared/ui/ButtonTab";

export const CashMenu = () => {
    const {tab} = useParams()
    const history = useNavigate()

    return <div className={style.wrapper}>
        <ButtonTab
            text={"M"}
            isActive={!tab || tab === "main"}
            tooltipText={"Cash - main"}
            onClick={() => {history("/cash/main")}}
        />
        <ButtonTab
            text={"W"}
            isActive={tab === "wallet"}
            tooltipText={"Cash - wallet"}
            onClick={() => {history("/cash/wallet")}}
        />
        <ButtonTab
            text={"Z"}
            isActive={tab === "autofill"}
            tooltipText={"Cash - autofill"}
            onClick={() => {history("/cash/autofill")}}
        />
        <ButtonTab
            text={"R"}
            isActive={tab === "report"}
            tooltipText={"Cash - report"}
            onClick={() => {history("/cash/report")}}
        />
    </div>
}
