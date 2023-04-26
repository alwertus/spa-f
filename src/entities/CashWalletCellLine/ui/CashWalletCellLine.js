import React, {useState} from 'react';
import style from './CashWalletCellLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {InvisibleInputText} from "../../../shared/ui/InvisibleInputText";

export const CashWalletCellLine = ({parentId, cell, actions}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalNotes, setShowModalNotes] = useState(false)
    // const [cellName, setCellName] = useState(cell.name)
    const [updateCellNameTrigger, setUpdateCellNameTrigger] = useState(false)

    const updateCellName = newName => {
        cell.name = newName
        actions.cellUpdate(parentId, cell)
    }

    return <div className={style.wrapper}>
        &#x2022;
        <ButtonComp
            text={cell.icon}
            tooltipText={"Icon"}
            onClick={() => {
                // setCellName(cell.name)
                setUpdateCellNameTrigger(!updateCellNameTrigger)
            }}
        />
        <div className={style.element}>
            <InvisibleInputText
                tooltipText={"Cell name"}
                defaultText={cell.name}
                acceptChanges={updateCellName}
                updateTrigger={updateCellNameTrigger}
            />
        </div>
        <div className={style.hidden}>
            <ButtonComp
                text={"N"}
                tooltipText={"Notes"}
                onClick={() => {setShowModalNotes(true)}}
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
        <ModalComp
            isOpen={showModalNotes}
            onClickOutsideHandler={() => {setShowModalNotes(false)}}
            content={
                <div className={style.modal}>
                    <InvisibleInputText
                        defaultText={cell['notes']}
                        acceptChanges={newValue => {
                            cell['notes'] = newValue
                            actions.cellUpdate(parentId, cell)
                        }}
                    />
                </div>}
        />
    </div>
}
