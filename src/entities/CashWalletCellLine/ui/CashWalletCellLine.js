import React, {useState} from 'react';
import style from './CashWalletCellLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";

export const CashWalletCellLine = ({parentId, cell, actions}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)

    return <div className={style.wrapper}>
        &#x2022;
        <ButtonComp
            text={cell.icon}
            tooltipText={"Icon"}
        />
        <div className={style.element}>
            {cell.name}
        </div>
        <div className={style.hidden}>
            <ButtonComp
                text={"N"}
                tooltipText={"Notes"}
                onClick={() => {}}
            />
            <ButtonComp
                text={cell.hidden ? "Show" : "Hide"}
                onClick={() => {
                    cell.hidden = !cell.hidden
                    actions.cellUpdate(parentId, cell)
                }}
            />
            <ButtonComp
                text={"Del"}
                onClick={() => {setShowModalDelete(true)}}
            />
        </div>

        <ModalComp
            isOpen={showModalDelete}
            onClickOutsideHandler={() => {setShowModalDelete(false)}}
            content={
                <div className={style.modal}>
                    <h4>Are you sure you want to delete wallet cell '{cell['name']}'?</h4>
                    <div className={style.modalButtons}>
                        <ButtonComp
                            text={"Cancel"}
                            onClick={() => {setShowModalDelete(false)}}
                        />
                        <ButtonComp
                            text={"Delete"}
                            onClick={() => {actions.cellRemove(parentId, cell.id)}}
                        />
                    </div>
                </div>}
        />
    </div>
}
