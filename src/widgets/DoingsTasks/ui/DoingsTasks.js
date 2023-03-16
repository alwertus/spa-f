import React, {useState} from "react";
import style from "./styles.module.css";
import {DoingsTaskList} from "../../../features/DoingsTaskList";
import {TaskButton} from "../../../entities/TaskButton";
import {TaskData} from "../model/TaskData";
import {elementComparatorByName} from "../../../shared/lib/Comparator";
import {LabelsData} from "../model/LabelsData";
import {DoingsLabelList} from "../../../features/DoingsLabelList";

export const DoingsTasks = () => {
    const {tasks, taskActions} = TaskData()
    const {labels, labelActions} = LabelsData()

    const [showModalLabels, setShowModalLabels] = useState(false)
    const [currentTask, setCurrentTask] = useState({})

    function openLabelDialogue(task) {
        setCurrentTask(task)
        setShowModalLabels(true)
    }

    return <div className={style.wrapper}>
        <div className={style.activeTasks}>
            {!!tasks && tasks
                .filter(e => e['checked'] === true)
                .sort(elementComparatorByName)
                .map(e => <TaskButton key={e['id']} element={e} taskActions={taskActions} />)}
        </div>
        <DoingsTaskList tasks={tasks} taskActions={taskActions} openLabelDialogue={openLabelDialogue}/>

        <DoingsLabelList
            showModalLabels={showModalLabels}
            setShowModalLabels={setShowModalLabels}
            labels={labels}
            currentTask={currentTask}
            labelActions={labelActions}
            taskActions={taskActions}
        />
    </div>
}