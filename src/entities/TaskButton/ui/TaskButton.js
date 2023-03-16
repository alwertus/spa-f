import React, {useState} from 'react';
import style from './TaskButton.module.css';

export const TaskButton = ({element, taskActions}) => {
    const [active, setActive] = useState(!!element['startDate'])

    function changeActive() {

        if (active) { // set inactive
            element['startDate'] = null
            taskActions.updateTask(element)
            setActive(false)

        } else { // set active
            element['startDate'] = Date.now()
            taskActions.updateTask(element)
            setActive(true)
        }
    }

    return <div className={style.wrapper + (active ? " " + style.active : "")}
    onClick={changeActive}>
        {element['name']}
    </div>
}
