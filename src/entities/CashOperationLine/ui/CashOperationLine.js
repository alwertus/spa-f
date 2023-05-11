import React, {useState} from 'react';
import style from './CashOperationLine.module.css';
import {InvisibleInputText} from "../../../shared/ui/InvisibleInputText";
import {CheckBox} from "../../../shared/ui/CheckBox";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {useIcons} from "../../../shared/lib/hooks/iconsContext";
import {stringToComponent} from "../../../shared/lib/ComponentConvertor";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";

export const CashOperationLine = ({item, Operation}) => {
    const icons = useIcons()
    const [showModalDelete, setShowModalDelete] = useState(false)

    return <div className={style.wrapper}>
        <CheckBox
            defaultIsChecked={!!item['completeDate']}
        />
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
        <ButtonComp
            icon={!!item['walletCellSource'] &&
                !!item['walletCellSource']['icon'] &&
                stringToComponent(icons.find(e => e.name === item['walletCellSource']['icon'])['svg'])}
            tooltipText={!!item['walletCellSource'] && item['walletCellSource']['name']}
        />
        &#8702;
        <ButtonComp
            icon={!!item['walletCellDestination'] &&
                !!item['walletCellDestination']['icon'] &&
                stringToComponent(icons.find(e => e.name === item['walletCellDestination']['icon'])['svg'])}
            tooltipText={!!item['walletCellDestination'] && item['walletCellDestination']['name']}
        />

        <div className={style.hiddenBar}>
            <ButtonComp
                icon={<DeleteIcon/>}
                tooltipText={"Delete operation"}
                onClick={() => {setShowModalDelete(true)}}
            />
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
                            }}
                        />
                    </div>
                </div>}
        />

    </div>
}
