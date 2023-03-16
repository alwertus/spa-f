import React from 'react';
import style from './DoingsLabelList.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {DoingsLabelListLine} from "../../../entities/DoingsLabelListLine";
import {elementComparatorByName} from "../../../shared/lib/Comparator";
import {DoingsLabelListAddLine} from "../../../entities/DoingsLabelListLine/ui/DoingsLabelListAddLine";

export const DoingsLabelList = ({showModalLabels, setShowModalLabels, labels, currentTask, labelActions, taskActions}) => {

    return <ModalComp
        isOpen={showModalLabels}
        onClickOutsideHandler={() => {setShowModalLabels(false)}}
        containerStyle={style.modalStyle}
        content={<div className={style.wrapper}>
            <div className={style.title}>
                <h3>Select labels</h3>
            </div>

            <DoingsLabelListAddLine
                labelActions={labelActions}
            />

            <div className={style.list}>
                {labels
                    .sort(elementComparatorByName)
                    .map(e => <DoingsLabelListLine
                        key={e['id']}
                        label={e}
                        task={currentTask}
                        labelActions={labelActions}
                        taskActions={taskActions}
                    />)}
            </div>

            <div className={style.modalButtons}>
                <ButtonComp
                    text={"Close"}
                    onClick={() => {setShowModalLabels(false)}}
                />
            </div>
        </div>}
    />
}