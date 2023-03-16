import React from "react";
import style from "./DatePicker.module.css";
import {InputTextComp} from "../../InputText/InputTextComp";

export const DrawYear = ({onClickHandler, defaultYear}) => {

    return <div className={style.year}>
        <InputTextComp
            acceptChanges={newVal => {onClickHandler(newVal)}}
            title={"Year"}
            defaultText={defaultYear}
        />
    </div>

}