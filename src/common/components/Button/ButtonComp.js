import style from "./Button.module.css";
import {ELEMENT_POSITION} from "../../Structures";
import { Tooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";
import {useId} from "react";


export const ButtonComp = ({
    text,
    onClick,
    icon,
    iconPosition = ELEMENT_POSITION.BEFORE,
    tooltipText
}) => {
    const reverseStyle = iconPosition === ELEMENT_POSITION.AFTER ? style.reverse : ""
    const id = useId()

    return <div id={id} className={style.wrapper}>

        <div className={`${style.element} ${reverseStyle}`} onClick={onClick}>
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