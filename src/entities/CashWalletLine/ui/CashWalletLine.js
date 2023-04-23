import React, {useState} from 'react';
import style from './CashWalletLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";
import toast from "react-hot-toast";
import {CashWalletCellLine} from "../../CashWalletCellLine";

export const CashWalletLine = ({wallet, actions}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [cellName, setCellName] = useState("")
    const [cellIcon, setCellIcon] = useState("")

    function createCell() {
        actions.cellCreate(wallet.id, cellName, cellIcon, () => {
            toast.success("Wallet-Cell created")
            // TODO: clear text after add
        })
    }

    return <div className={style.wrapper + " " + style.column}>
        <div className={[style.row, style.spaceBetween, style.headLine].join(" ")}>
            {`${wallet.name} - ${wallet.currency.name}`}
            <div className={style.row + " " + style.defaultHidden}>
                <ButtonComp
                    text={wallet.hidden ? "Show" : "Hide"}
                    onClick={() => {
                        wallet.hidden = !wallet.hidden
                        actions.update(wallet)
                    }}
                />
                <ButtonComp
                    text={"Del"}
                    onClick={() => {setShowModalDelete(true)}}
                />
            </div>
        </div>

        <div className={style.column + " " + style.startSpace}>
            <div className={style.row}>
                <div className={style.element}>
                    <ButtonComp
                        icon={<AddIcon/>}
                        tooltipText={"Add wallet cell"}
                        onClick={createCell}
                    />
                </div>
                <div className={style.element}>
                    <InputTextComp
                        title={"Cell name"}
                        acceptChanges={text => {setCellName(text)}}
                    />
                </div>
                <div className={style.element}>
                    <InputTextComp
                        title={"Icon"}
                        acceptChanges={text => {setCellIcon(text)}}
                    />
                </div>
            </div>

            {
                !!wallet['cells'] && wallet['cells'].map(e => <div key={e.id} className={style.row}>
                    <CashWalletCellLine cell={e} parentId={wallet.id} actions={actions}/>
                </div>)
            }
        </div>

        <ModalComp
            isOpen={showModalDelete}
            onClickOutsideHandler={() => {setShowModalDelete(false)}}
            content={
                <div className={style.modal}>
                    <h4>Are you sure you want to delete wallet '{wallet['name']}'?</h4>
                    <div className={style.modalButtons}>
                        <ButtonComp
                            text={"Cancel"}
                            onClick={() => {setShowModalDelete(false)}}
                        />
                        <ButtonComp
                            text={"Delete"}
                            onClick={() => {actions.remove(wallet.id)}}
                        />
                    </div>
                </div>}
        />

    </div>
}
