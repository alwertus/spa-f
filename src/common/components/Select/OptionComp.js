import style from "./Option.module.css";
export const OptionComp = ({title, onClick}) => {
    return <div className={style.wrapper} onClick={onClick}>
        {title}
    </div>
}