import React, {useEffect} from 'react';
import style from './Cash.module.css';
import {CashGraph} from "../../../features/CashGraph";
import {CashMenu} from "../../../features/CashMenu";
import {CashMain} from "../../../widgets/CashMain";
import {useNavigate, useParams} from "react-router-dom";
import {CashWallet} from "../../../widgets/CashWallet";
import {CashLogic} from "../model/CashLogic";

export const Cash = ({savePath}) => {
    const {tab} = useParams()
    const history = useNavigate()
    const [
        currencyList,
        Wallet,
        Cell,
        Operation,
    ] = CashLogic()
    const tabContents = {main: <CashMain/>, wallet: <CashWallet Wallet={Wallet} Cell={Cell} currencyList={currencyList}/>}

    useEffect(() => {
        if (!!tab)
            savePath(tab)
        else {
            history("/cash/main")
        }

    }, [tab])

    return <div className={style.wrapper}>
        <div className={style.horizontal}>
            <CashMenu/>
            <CashGraph/>
        </div>
        {tabContents[tab]}
    </div>
}
