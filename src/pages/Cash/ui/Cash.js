import React, {useEffect} from 'react';
import style from './Cash.module.css';
import {CashGraph} from "../../../features/CashGraph";
import {CashMenu} from "../../../features/CashMenu";
import {CashMain} from "../../../widgets/CashMain";
import {useParams} from "react-router-dom";
import {CashWallet} from "../../../widgets/CashWallet";

export const Cash = ({savePath}) => {
    const {tab} = useParams()
    const tabContents = {main: <CashMain/>, wallet: <CashWallet/>}

    useEffect(() => {
        if (!!tab)
            savePath(tab)
    }, [tab])

    return <div className={style.wrapper}>
        <div className={style.horizontal}>
            <CashMenu/>
            <CashGraph/>
        </div>
        {tabContents[tab]}
    </div>
}
