import style from './WysiwygEditor.module.css';
import React, {useState} from "react";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as ArrowUp} from "../../../shared/ui/img/arrow-up.svg"
import {ReactComponent as ArrowDown} from "../../../shared/ui/img/arrow-down.svg"

export const WysiwygEditor = ({text, setText, hasUnsavedChanges}) => {
    const [mode, setMode] = useState("edit")
    const [tmpText, setTmpText] = useState(text)

    return <div>
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
                    className={`${style.wrapper} ${hasUnsavedChanges ? style.needToSave : style.notNeedToSave}`}
                    dangerouslySetInnerHTML={{ __html: tmpText }}
                    contentEditable
                    onInput={(e) => setText(e.currentTarget.innerHTML)}
                />
                :
                <div className={`${style.wrapper} ${hasUnsavedChanges ? style.needToSave : style.notNeedToSave}`}>
                    <textarea
                        className={style.editor}
                        value={text}
                        onChange={e => {
                            setText(e.target.value)
                            setTmpText(e.target.value)
                        }}
                    />
                </div>
        }
    </div>
}