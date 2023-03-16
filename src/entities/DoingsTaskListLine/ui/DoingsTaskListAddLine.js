import React, {useState} from 'react';
import style from './DoingsTaskListLine.module.css';
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";

export const DoingsTaskListAddLine = ({taskActions}) => {
    const [name, setName] = useState("")

    return <div className={style.simpleWrapper}>

        <ButtonComp
            icon={<AddIcon/>}
            tooltipText={"Create new task"}
            onClick={() => {
                taskActions.createTask(name)
                setName("")
            }}
        />

        <InputTextComp
            title={"New task name"}
            defaultText={name}
            acceptChanges={setName}
        />

    </div>
}
