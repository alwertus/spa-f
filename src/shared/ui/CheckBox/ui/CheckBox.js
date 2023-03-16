import React, {useState} from 'react';
import {ButtonComp} from "../../Button/ButtonComp";
import {ReactComponent as CheckedIcon} from "../const/checked.svg";
import {ReactComponent as UncheckedIcon} from "../const/unchecked.svg";

export const CheckBox = ({ defaultIsChecked = true,
                           onChange = () => {} }) => {
    const [checked, setChecked] = useState(defaultIsChecked)

    function onClickHandler() {
        onChange(!checked)
        setChecked(!checked)
    }

    return <ButtonComp
        icon={checked ? <CheckedIcon/> : <UncheckedIcon/>}
        onClick={onClickHandler}
    />
}
