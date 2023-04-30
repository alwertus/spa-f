import React, {useState} from 'react';
import style from './CashWalletCellLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {InvisibleInputText} from "../../../shared/ui/InvisibleInputText";
import {useIcons} from "../../../shared/lib/hooks/iconsContext";
import {DEFAULT_ICON} from "../../../shared/const/defaultIcon";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";
import {ReactComponent as HideIcon} from "../../../shared/ui/img/eye-closed.svg";
import {ReactComponent as ShowIcon} from "../../../shared/ui/img/eye.svg";
import {ReactComponent as NotesEmptyIcon} from "../../../shared/ui/img/notes-empty.svg";
import {ReactComponent as NotesFilledIcon} from "../../../shared/ui/img/notes-filled.svg";
import {stringToComponent} from "../../../shared/lib/ComponentConvertor";

export const CashWalletCellLine = ({parentId, cell, Cell}) => {
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalNotes, setShowModalNotes] = useState(false)
    const [showModalIcons, setShowModalIcons] = useState(false)
    const icons = useIcons()

    const updateCellName = newName => {
        cell.name = newName
        Cell.update(parentId, cell)
    }

    const ico = icons.find(e => e.name === cell.icon) || {name:'DEFAULT', svg:DEFAULT_ICON}

    return <div className={style.wrapper}>
        &#x2022;
        <ButtonComp
            icon={stringToComponent(!!ico && ico['svg'])}
            tooltipText={"Icon"}
            onClick={() => {
                setShowModalIcons(true)
            }}
        />
        <div className={style.element}>
            <InvisibleInputText
                tooltipText={"Cell name"}
                defaultText={cell.name}
                acceptChanges={updateCellName}
            />
        </div>
        <div className={style.hidden}>
            <ButtonComp
                icon={!!cell.notes ? <NotesFilledIcon/> : <NotesEmptyIcon/>}
                tooltipText={"Notes"}
                onClick={() => {setShowModalNotes(true)}}
            />
            <ButtonComp
                tooltipText={cell.hidden ? "Show" : "Hide"}
                icon={cell.hidden ? <HideIcon/> : <ShowIcon/>}

                onClick={() => {
                    cell.hidden = !cell.hidden
                    Cell.update(parentId, cell)
                }}
            />
            <ButtonComp
                icon={<DeleteIcon/>}
                tooltipText={"Delete wallet cell '" + cell.name + "'"}
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
                            onClick={() => {Cell.remove(parentId, cell.id)}}
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
                            Cell.update(parentId, cell)
                        }}
                        discardChanges={() => {setShowModalNotes(false)}}
                        autoFocus={true}
                    />
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
                                    cell['icon'] = icon.name
                                    Cell.update(parentId, cell)
                                    setShowModalIcons(false)
                                }}
                            />)
                    }
                </div>
            }
        />
    </div>
}
