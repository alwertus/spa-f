import React from 'react';
import style from './DoingsLabelListLine.module.css';
import {CheckBox} from "../../../shared/ui/CheckBox";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as DeleteIcon} from "../../../shared/ui/img/delete.svg";

export const DoingsLabelListLine = ({label, task, labelActions, taskActions}) => {


    const isChecked = !!task['labels'] && task['labels'].filter(e => e['id'] === label['id']).length > 0

    return <div className={style.wrapper}>
        <div className={style.labelLine}>
            <CheckBox defaultIsChecked={isChecked}
                      onChange={(newVal) => {
                          if (newVal) {
                              if (!task['labels']) {
                                  task['labels'] = [label]
                              } else {
                                  task['labels'].push(label)
                              }
                              taskActions.updateTask(task)
                          } else {
                              task['labels'] = task['labels'].filter(e => e['id'] !== label['id'])
                              taskActions.updateTask(task)
                          }
                      }}
            />
            <InputTextComp
                defaultText={label['name']}
                acceptChanges={(newName) => {
                    if (!newName || newName === label['name']) return
                    label['name'] = newName
                    labelActions.updateLabel(label)
                }}
            />
            <ButtonComp
                icon={<DeleteIcon/>}
                onClick={() => {
                    labelActions.deleteLabel(label, () => {
                        taskActions.reload()
                    })
                }}
                tooltipText={"Remove task"}
            />
        </div>

    </div>

}
