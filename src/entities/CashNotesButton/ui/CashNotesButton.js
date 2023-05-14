import React, {useEffect, useState} from 'react';
import style from './CashNotesButton.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as NotesEmpty} from "../../../shared/ui/img/notes-empty.svg";
import {ReactComponent as NotesFilled} from "../../../shared/ui/img/notes-filled.svg";
import {MultirowTextInput} from "../../../shared/ui/MultirowTextInput";
import {MiniModal} from "../../../shared/ui/MiniModal";

export const CashNotesButton = ({onCloseHandler, defaultText}) => {
    const [showDialogue, setShowDialogue] = useState(false)
    const [text, setText] = useState(defaultText)

    useEffect(() => {
        if (!showDialogue) {
            onCloseHandler(text)
        }
    }, [showDialogue])

    return <div className={style.wrapper}>
        <ButtonComp
            tooltipText={!!text ? text : "Notes"}
            icon={!!text ? <NotesFilled/> : <NotesEmpty/>}
            onClick={() => {setShowDialogue(true)}}
        />

        {showDialogue && <MiniModal
            closeDialogueHandler={() => {setShowDialogue(false)}}
            content={<MultirowTextInput
                text={text}
                setText={setText}
            />}
        />}

    </div>
}
