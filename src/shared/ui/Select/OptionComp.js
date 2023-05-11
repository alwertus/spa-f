import style from "./Option.module.css";
import {ButtonComp} from "../Button/ButtonComp";
export const OptionComp = ({icon, title, onClick}) => {
    return <div className={style.wrapper} onClick={onClick}>

        {!!icon && <div className={style.icon}>{icon}</div>}
        {title}
    </div>
}