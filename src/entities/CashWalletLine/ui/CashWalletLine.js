import React, {useState} from 'react';
import style from './CashWalletLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";
import toast from "react-hot-toast";
import {CashWalletCellLine} from "../../CashWalletCellLine";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";
import {ReactComponent as HideIcon} from "../../../shared/ui/img/eye-closed.svg";
import {ReactComponent as ShowIcon} from "../../../shared/ui/img/eye.svg";
import {InvisibleInputText} from "../../../shared/ui/InvisibleInputText";
import {useIcons} from "../../../shared/lib/hooks/iconsContext";
import {stringToComponent} from "../../../shared/lib/ComponentConvertor";
import {DEFAULT_ICON} from "../../../shared/const/defaultIcon";

export const CashWalletLine = ({wallet, Wallet, Cell}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalIcons, setShowModalIcons] = useState(false)
    const [updateCellNameTrigger, setUpdateCellNameTrigger] = useState(false)
    const [cellName, setCellName] = useState("")
    const [cellIcon, setCellIcon] = useState({name:'DEFAULT', svg:DEFAULT_ICON})
    const icons = useIcons()

    function createCell() {
        Cell.create(wallet.id, cellName, cellIcon.name, () => {
            toast.success("Wallet-Cell created")

            // TODO: clear text after add. DO NOT WORK CORRECT!! check code below
            setUpdateCellNameTrigger(!updateCellNameTrigger)
            setCellIcon({name:'DEFAULT', svg:DEFAULT_ICON})
        })
    }

    return <div className={style.wrapper + " " + style.column}>
        <div className={[style.row, style.spaceBetween, style.headLine].join(" ")}>

            {wallet.currency.name}
            <div className={style.flex1}>
                <InvisibleInputText
                    defaultText={wallet.name}
                    acceptChanges={newValue => {
                        wallet.name = newValue
                        Wallet.update(wallet)
                    }}
                />
            </div>

            <div className={style.row + " " + style.defaultHidden}>
                <ButtonComp
                    tooltipText={wallet.hidden ? "Show" : "Hide"}
                    icon={wallet.hidden ? <HideIcon/> : <ShowIcon/>}
                    onClick={() => {
                        wallet.hidden = !wallet.hidden
                        Wallet.update(wallet)
                    }}
                />
                <ButtonComp
                    tooltipText={"Delete wallet '" + wallet.name + "'"}
                    icon={<DeleteIcon/>}
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
                        defaultText={""}
                        acceptChanges={text => {setCellName(text)}}
                        updateTrigger={updateCellNameTrigger}
                    />
                </div>
                <div className={style.element}>
                    <ButtonComp
                        icon={stringToComponent(cellIcon.svg)}
                        tooltipText={"Icon"}
                        onClick={() => {
                            setShowModalIcons(true)
                        }}
                    />
                </div>
            </div>

            {
                !!wallet['cells'] && wallet['cells'].map(e => <div key={e.id} className={style.row}>
                    <CashWalletCellLine cell={e} parentId={wallet.id} Cell={Cell}/>
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
                            onClick={() => {Wallet.remove(wallet.id)}}
                        />
                    </div>
                </div>}
        />
        <ModalComp
            isOpen={showModalIcons}
            onClickOutsideHandler={() => {setShowModalIcons(false)}}
            content={
                <div className={style.modalIcons}>
                    {!!icons && icons.map(icon => <ButtonComp
                        key={icon.name}
                        icon={stringToComponent(icon['svg'])}
                        tooltipText={icon.name}
                        onClick={() => {
                            setCellIcon(icon)
                            setShowModalIcons(false)
                        }}
                    />)
                    }
                </div>
            }
        />

    </div>
}
