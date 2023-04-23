import React, {useEffect, useId, useState} from 'react';
import style from './ButtonTab.module.css';
import {ELEMENT_POSITION} from "../../../const/Structures";
import {Tooltip} from "react-tooltip";

export const ButtonTab = ({
                              text,
                              onClick,
                              icon,
                              iconPosition = ELEMENT_POSITION.BEFORE,
                              tooltipText,
                              isActive = false,
                          }) => {
    const id = useId()
    const [wrapperStyle, setWrapperStyle] = useState("")

    useEffect(() => {
        const newWrapperStyle = [style.element]
        if (iconPosition === ELEMENT_POSITION.AFTER) {
            newWrapperStyle.push(style.reverse)
        }
        if (isActive) {
            newWrapperStyle.push(style.active)
        }
        setWrapperStyle(newWrapperStyle.join(" "))
    }, [isActive, iconPosition])

    return <div id={id} className={style.wrapper} >
        <div className={wrapperStyle} onClick={onClick}>
            {icon}
            {text}
        </div>
        {!!tooltipText && <Tooltip
            anchorId={id}
            place={"bottom"}
            content={tooltipText}
            delayShow={500}
        />}
    </div>
}
