import React, {useEffect, useRef} from 'react';
import style from './MiniModal.module.css';

/**
 * set parent element css:
 * position: relative;
 */
export const MiniModal = ({closeDialogueHandler, content}) => {
    const dialogueRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogueRef.current && !dialogueRef.current.contains(event.target)) {
                closeDialogueHandler()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dialogueRef])

    return <div ref={dialogueRef} className={style.wrapper}>
        {content}
    </div>
}
