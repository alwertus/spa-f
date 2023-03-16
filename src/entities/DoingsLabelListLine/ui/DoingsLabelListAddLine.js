import React, {useState} from 'react';
import style from './DoingsLabelListLine.module.css';
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";

export const DoingsLabelListAddLine = ({labelActions}) => {
    const [name, setName] = useState("")

    return <div className={style.addWrapper}>
        <ButtonComp
            icon={<AddIcon/>}
            tooltipText={"Create new label"}
            onClick={() => {
                labelActions.createLabel(name)
                setName("")
            }}
        />

        <InputTextComp
            title={"New label name"}
            defaultText={name}
            acceptChanges={setName}
        />

    </div>

}
