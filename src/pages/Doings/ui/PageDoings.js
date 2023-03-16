import React from "react";
import style from "./PageDoings.module.css";
import {DoingsTasks} from "../../../widgets/DoingsTasks";
import {DoingsReport} from "../../../widgets/DoingsReport";

export const PageDoings = () => {

    return <div className={style.wrapper}>
       <div className={style.tasks}><DoingsTasks/></div>
       <div className={style.report}><DoingsReport/></div>
    </div>
}