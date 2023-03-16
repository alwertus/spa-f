import React from 'react';
import style from './DoingsTaskList.module.css';
import {DoingsTaskListLine} from "../../../entities/DoingsTaskListLine";
import {elementComparatorByName} from "../../../shared/lib/Comparator";
import {DoingsTaskListAddLine} from "../../../entities/DoingsTaskListLine/ui/DoingsTaskListAddLine";

export const DoingsTaskList = ({tasks, taskActions, openLabelDialogue}) => {

    return <div className={style.wrapper}>
        <DoingsTaskListAddLine taskActions={taskActions}/>

        {!!tasks && tasks
            .sort(elementComparatorByName)
            .map(e => <DoingsTaskListLine
                key={e['id']}
                element={e}
                tasks={tasks}
                taskActions={taskActions}
                openLabelDialogue={openLabelDialogue}
            />)}
    </div>
}
