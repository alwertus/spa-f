import React, {useEffect, useId, useState} from 'react';
import style from './InvisibleInputText.module.css';
import {Tooltip} from "react-tooltip";

export const InvisibleInputText = ({
                                       tooltipText,
                                       defaultText = "",
                                       acceptChanges,
                                       discardChanges,
                                       updateTrigger,   // each change invokes the `useEffect` logic
                                       autoFocus = false,
                                   }) => {
    const id = useId()
    const [text, setText] = useState(defaultText)

    const onAccept = () => {
        if (!!acceptChanges && defaultText !== text) {
            acceptChanges(text)
        }
    }

    const onDiscard = () => {
        setText(defaultText)
        if (!!discardChanges)
            discardChanges()
    }

    useEffect(() => {
        setText(defaultText)
    },[defaultText, updateTrigger])

    return <div id={id} className={style.wrapper}>
        <input
            autoFocus={autoFocus}
            className={style.input}
            type={"text"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={onAccept}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onAccept(text)
                }
                if (e.key === 'Escape') {
                    onDiscard()
                }
            }}

        />
        {!!tooltipText && <Tooltip
            anchorId={id}
            place={"bottom"}
            content={tooltipText}
            delayShow={500}
        />}
    </div>
}
