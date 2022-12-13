import style from "./Button.module.css";
import {ELEMENT_POSITION} from "../../Structures";

export const ButtonComp = ({
    text,
    onClick,
    icon,
    iconPosition = ELEMENT_POSITION.BEFORE
}) => {

    const reverseStyle = iconPosition === ELEMENT_POSITION.AFTER ? style.reverse : ""

    return <div className={style.wrapper} onClick={onClick}>
        <div className={`${style.element} ${reverseStyle}`}>
            {icon}
            {text}
        </div>
    </div>
}