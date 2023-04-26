import React, {useEffect, useState} from "react";
import style from "./InputText.module.css";

export const InputTextComp = ({
                                  title = "",
                                  defaultText = "",
                                  acceptChanges = () => {},
                                  type = "text",
                                  onKeyPress = () => {},
                                  updateTrigger,   // each change invokes the `useEffect` logic

}) => {
    const [focus, setFocus] = useState(false)
    const [text, setText] = useState(defaultText)

    const onAccept = () => {
        setFocus(false)
        !!acceptChanges && acceptChanges(text)
    }

    useEffect(() => {
        setText(defaultText)
    },[defaultText, updateTrigger])

    return <div className={style.wrapper}>
        <div className={`${style.placeholder} ${focus || !!text ? style.placeholderRaise : style.placeholderNormal}`}>
            {title}
        </div>
        <input className={style.input}
               type={type}
               value={text}
               onFocus={() => setFocus(true)}
               onBlur={onAccept}
               onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                       onAccept()
                   }
               }}
               onChange={(e) => setText(e.target.value)}
               onKeyPress={onKeyPress}
        />
    </div>
}