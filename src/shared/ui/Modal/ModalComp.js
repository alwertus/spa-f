import React from "react";
import style from "./Modal.module.css";


export const ModalComp = ({   isOpen,
                              onClickOutsideHandler = () => {},
                              content,
                              containerStyle
}) => {
    const OUTSIDE_ID = "outside"

    function onClickOutside(e) {
        if (e.target['id'] === OUTSIDE_ID)
            onClickOutsideHandler()
    }

    return isOpen ? <div className={style.wrapper}
                         id={OUTSIDE_ID}
                         onClick={onClickOutside}
    >
        <div className={style.container + (!!containerStyle ? " " + containerStyle : "")}>{content}</div>
    </div> : <div className={style.hidden}/>
}