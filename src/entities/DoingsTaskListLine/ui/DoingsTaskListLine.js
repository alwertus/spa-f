import React, {useState} from 'react';
import style from './DoingsTaskListLine.module.css';
import {CheckBox} from "../../../shared/ui/CheckBox";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";
import {ReactComponent as EditIcon} from "../../../shared/ui/img/options.svg";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {elementComparatorByName} from "../../../shared/lib/Comparator";

export const DoingsTaskListLine = ({element, taskActions, openLabelDialogue}) => {
    // const [showModalLabels, setShowModalLabels] = useState(false)
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false)

    function onCheckedChanged(newVal) {
        element['checked'] = newVal
        taskActions.updateTask(element)
    }

    function onNameChanged(newVal) {
        if (element['name'] === newVal || !newVal) return;
        element['name'] = newVal
        taskActions.updateTask(element)
    }

    return <div className={style.wrapper}>

        <CheckBox defaultIsChecked={element['checked']}
            onChange={onCheckedChanged}
        />

        <InputTextComp
            defaultText={element['name']}
            acceptChanges={onNameChanged}
        />

        <div className={style.labels}>
            {!!element['labels'] && element['labels']
                .sort(elementComparatorByName)
                .map((e) =>
                <div key={e['id']} className={style.label}>{e['name']}</div>
            )}
        </div>

        <div className={style.buttons}>
            <ButtonComp
                icon={<EditIcon/>}
                onClick={() => {openLabelDialogue(element)}}
            />
            <ButtonComp
                icon={<DeleteIcon/>}
                onClick={() => {
                    // taskActions.deleteTask(element)
                    setShowModalConfirmDelete(true)
                }}
                tooltipText={"Remove task"}
            />
        </div>

        <ModalComp
            isOpen={showModalConfirmDelete}
            onClickOutsideHandler={() => {setShowModalConfirmDelete(false)}}
            content={
            <div className={style.modal}>
                <h4>Are you sure you want to delete task '{element['name']}'?</h4>
                <div className={style.modalButtons}>
                    <ButtonComp
                        text={"Delete"}
                        onClick={() => {taskActions.deleteTask(element)}}
                    />
                    <ButtonComp
                        text={"Cancel"}
                        onClick={() => {setShowModalConfirmDelete(false)}}
                    />
                </div>
            </div>}
        />

    </div>
}
