import style from './WysiwygEditor.module.css';
import React, {useState} from "react";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as ArrowUp} from "../../../shared/ui/img/arrow-up.svg"
import {ReactComponent as ArrowDown} from "../../../shared/ui/img/arrow-down.svg"

export const WysiwygEditor = ({text, setText, isSaved}) => {
    const [mode, setMode] = useState("edit")

    return <div className={`${style.wrapper} ${isSaved ? style.notNeedToSave : style.needToSave}`}>
        <div className={style.buttonGroup}>
            <div className={style.showCode}>
                <ButtonComp
                    icon={mode === "edit" ? <ArrowDown/> : <ArrowUp/>}
                    tooltipText={mode === "edit" ? "show html code" : "hide html code"}
                    onClick={() => {
                        setMode(mode === "edit" ? "html" : "edit")
                    }}
                />
            </div>
        </div>
        {
            mode === "edit"
                ?
                <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    contentEditable
                    onBlur={(e) => setText(e.target.innerHTML)}
                />
                :
                <textarea
                className={style.editor}
                value={text}
                onChange={e => setText(e.target.value)}
                />
        }
    </div>
}