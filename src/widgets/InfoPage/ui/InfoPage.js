import React, {useEffect, useState} from "react";
import style from "./styles.module.css";
import {useParams} from "react-router-dom";
import {getPage} from "../api/actions";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {WysiwygEditor} from "../../../features/WysiwygEditor";

export const InfoPage = () => {
    const {spaceId} = useParams()
    const {pageId} = useParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [page, setPage] = useState({})
    const [pageText, setPageText] = useState("")

    useEffect(() => {
        if (!!pageId) {
            console.log("LOAD PAGE #" + pageId)
            getPage(spaceId, pageId, setPage)
        }
    },[pageId])

    if (!pageId) return <div>
        no content
    </div>

    return <div className={style.wrapper}>
        <div className={style.actions}>
            <ButtonComp
                text={isEditMode ? "Normal" : "Edit"}
                onClick={() => {setIsEditMode(!isEditMode)}}
            />
            <ButtonComp
                text={"Save"}
                onClick={() => {setIsEditMode(!isEditMode)}}
            />
        </div>

        {
            isEditMode
                ? <WysiwygEditor
                    text={pageText}
                    setText={setPageText}
                />
                : <div className={style.wrapper} dangerouslySetInnerHTML={{__html: pageText}}/>
        }
    </div>
}