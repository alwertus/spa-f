import {useNavigate} from "react-router-dom";
import style from "./Info.module.css";
import {ButtonComp} from "../../shared/ui/Button/ButtonComp";
import {ReactComponent as UpIcon} from "../../shared/ui/img/arrow-up.svg"
import React, {useState} from "react";

export const ListItem = ({itemData, generateHistoryPathByPageId, closeModal, setParentId, parentId}) => {

    const history = useNavigate()
    const id = itemData['id'] ? itemData['id'].toString() : undefined
    const [showChildren, setShowChildren] = useState(!id)

    function drawExpandElement() {
        if (itemData.children.length <= 0 || !id) return

        return showChildren
            ? <ButtonComp
                icon={<UpIcon/>}
                onClick={() => setShowChildren(false)}
                tooltipText={"Hide children"}
            />
            : <ButtonComp
                icon={<UpIcon style={{transform: 'rotate(180deg)'}}/>}
                onClick={() => setShowChildren(true)}
                tooltipText={"Show children"}
            />
    }

    return <div className={style.listItemWrapper}>

        <div className={style.listItemRow}>
            <input type={"radio"}
                    className={style.radio}
                    value={id}
                    name={"tmp-selected-page"}
                    onChange={(e) => {
                        setParentId(e.target.value)
                    }}
            />

            <div
                className={style.listItemPageName}
                onClick={() => {
                    if (!!id) {
                        history(generateHistoryPathByPageId(id))
                        closeModal()
                    }
                }}>
                {itemData.title}
            </div>

            {drawExpandElement()}

        </div>

        {showChildren && <div className={style.listItemChildren}>
            {itemData.children
                .sort((a, b) => {
                    let A = (!!a ? a : 0)
                    let B = (!!b ? b : 0)
                    return A-B
                })
                .map(e => <ListItem
                    key={e.id}
                    itemData={e}
                    generateHistoryPathByPageId={generateHistoryPathByPageId}
                    closeModal={closeModal}
                    setParentId={setParentId}
                    parentId={parentId}
            />)}
        </div>}

    </div>
}