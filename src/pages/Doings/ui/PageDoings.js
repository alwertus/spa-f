import React, {useState} from "react";
import style from "./PageDoings.module.css";
import {DoingsTasks} from "../../../widgets/DoingsTasks";
import {DoingsReport} from "../../../widgets/DoingsReport";

export const PageDoings = () => {
    const [showReport, setShowReport] = useState(false)

    function changeShowReport() {
        setShowReport(!showReport)
    }

    return <div className={style.wrapper}>
       <div className={style.tasks}><DoingsTasks
           changeShowReport={changeShowReport}
       /></div>

        {showReport && <div className={style.report}><DoingsReport/></div>}
    </div>
}