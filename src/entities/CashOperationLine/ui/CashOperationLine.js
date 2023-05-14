import React, {useState} from 'react';
import style from './CashOperationLine.module.css';
import {InvisibleInputText} from "../../../shared/ui/InvisibleInputText";
import {CheckBox} from "../../../shared/ui/CheckBox";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import toast from "react-hot-toast";
import {CashWalletCellChecker} from "../../CashWalletCellChecker";
import {CashNotesButton} from "../../CashNotesButton";
import {CashOperationDetails} from "../../CashOperationDetails";

export const CashOperationLine = ({item, Operation, Cell}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)

    return <div className={style.wrapper}>
        <CheckBox
            defaultIsChecked={!!item['completeDate']}
            onChange={newVal => {
                item['completeDate'] = newVal ? (new Date()).getMilliseconds() : null
                Operation.update(item)
            }}
        />
        :)
        <InvisibleInputText
            defaultText={!!item['product'] ? item['product']['name'] : "noname"}
            acceptChanges={newVal => {
                item['product'] = {'name': newVal}
                Operation.update(item)
            }}
        />
        <InvisibleInputText
            defaultText={!!item.compositeSum ? item.compositeSum : item.sum}
            tooltipText={!!item.compositeSum ? item.sum : null}
            acceptChanges={newVal => {
                if (isNaN(newVal)) {
                    item.sum = null
                    item.compositeSum = newVal
                } else {
                    item.sum = newVal
                    item.compositeSum = null
                }
                Operation.update(item)
            }}
        />

        <div className={style.group}>
            <CashWalletCellChecker
                selectedCell={item['walletCellSource']}
                Cell={Cell}
                selectCellHandler={newCell => {
                    item['walletCellSource'] = newCell
                    Operation.update(item)
                }}
            />
            &#8702;
            <CashWalletCellChecker
                selectedCell={item['walletCellDestination']}
                Cell={Cell}
                selectCellHandler={newCell => {
                    item['walletCellDestination'] = newCell
                    Operation.update(item)
                }}
            />
        </div>

        <div className={style.group}>
            <div className={!item['notes'] ? style.hiddenBar : style.group}>
                <CashNotesButton
                    onCloseHandler={(newText) => {
                        if (item['notes'] === newText || (!item['notes'] && !newText)) return;
                        item['notes'] = newText
                        Operation.update(item)
                    }}
                    defaultText={item['notes']}
                />
            </div>
            <div className={(item['rate'] !== 1 || item['transferFee'] !== 0) ? style.group : style.hiddenBar}>
                <CashOperationDetails
                    item={item}
                    updateItemHandler={Operation.update}
                />
            </div>

        </div>

        <div className={style.group1}>
            <div className={style.hiddenBar + " " + style.alignEnd}>
                <ButtonComp
                    icon={<DeleteIcon/>}
                    tooltipText={"Delete operation"}
                    onClick={() => {setShowModalDelete(true)}}
                />
            </div>
        </div>

        <ModalComp
            isOpen={showModalDelete}
            onClickOutsideHandler={() => {setShowModalDelete(false)}}
            content={
                <div className={style.modal}>
                    <h4>Are you sure you want to delete:</h4>
                    <h5>Operation: '{item && item['product'] && item['product']['name']}'<br/>Sum: {item.sum}?</h5>
                    <div className={style.modalButtons}>
                        <ButtonComp
                            text={"Cancel"}
                            onClick={() => {setShowModalDelete(false)}}
                        />
                        <ButtonComp
                            text={"Delete"}
                            onClick={() => {
                                Operation.remove(item.id)
                                setShowModalDelete(false)
                                toast.success("Deleted")
                            }}
                        />
                    </div>
                </div>}
        />

    </div>
}
