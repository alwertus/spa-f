import React, {useState} from 'react';
import style from './CashWallet.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {SelectComp} from "../../../shared/ui/Select/SelectComp";
import {CashWalletLine} from "../../../entities/CashWalletLine";
import {CashLogic} from "../../../pages/Cash/model/CashLogic";

export const CashWallet = ({ Wallet, Cell, currencyList }) => {

    const [newWalletName, setNewWalletName] = useState("")
    const [currency, setCurrency] = useState()

    return <div className={style.wrapper}>
        <div className={style.line}>
            <ButtonComp
                icon={<AddIcon/>}
                tooltipText={"Add Wallet"}
                onClick={() => {
                    Wallet.create(newWalletName, currency)
                    // setNewWalletName("")
                    // TODO: clear text after add
                }}
            />
            <InputTextComp
                title={"Wallet name"}
                acceptChanges={e => {setNewWalletName(e)}}
            />
            <SelectComp
                values={!!currencyList && currencyList.map(e => {return {id: e.id, title: e.name}})}
                onChange={setCurrency}
            />
        </div>
        {!!Wallet.list && Wallet.list.map(e =>
            <CashWalletLine
                key={e.id}
                wallet={e}
                Wallet={Wallet}
                Cell={Cell}
            />
        )}
    </div>
}
