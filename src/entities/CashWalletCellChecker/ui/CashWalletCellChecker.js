import React, {useState} from 'react';
import style from './CashWalletCellChecker.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {stringToComponent} from "../../../shared/lib/ComponentConvertor";
import {useIcons} from "../../../shared/lib/hooks/iconsContext";
import {ReactComponent as NoneIcon} from "../../../shared/ui/img/empty.svg";
import {MiniModal} from "../../../shared/ui/MiniModal";

export const CashWalletCellChecker = ({   selectedCell,
                                          selectCellHandler = () => {},
                                          Cell,
                                          noSelectIcon = <NoneIcon/>,
                                          noSelectText = "not selected"
}) => {
    const icons = useIcons()
    const [showDialogue, setShowDialogue] = useState(false)

    return <div className={style.wrapper}>
        <ButtonComp
            tooltipText={!!selectedCell ? selectedCell['name'] : noSelectText}
            icon={!!selectedCell
                ? stringToComponent(icons.find(e => e.name === selectedCell['icon'])['svg'])
                : noSelectIcon}
            onClick={() => {setShowDialogue(true)}}
        />

        {showDialogue && <MiniModal
            closeDialogueHandler={() => {setShowDialogue(false)}}
            content={<div>
                <div className={style.dialogueListLine}>
                    <ButtonComp
                        icon={noSelectIcon}
                        onClick={() => {
                            selectCellHandler(null)
                            setShowDialogue(false)
                        }}
                    />
                    <div className={style.text}>
                        {noSelectText}
                    </div>
                </div>
                <hr/>
                {Cell.list().map(e => <div key={e.id} className={style.dialogueListLine}>
                    <ButtonComp
                        icon={e.icon}
                        onClick={() => {
                            selectCellHandler(e)
                            setShowDialogue(false)
                        }}
                    />
                    <div className={style.text}>
                        {e.name}
                    </div>
                </div>)
                }
            </div>}
        />}

    </div>
}
