import React, {useEffect, useState} from "react";
import style from "./styles.module.css";
import {useParams} from "react-router-dom";
import {getPage, savePage} from "../api/actions";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {WysiwygEditor} from "../../../features/WysiwygEditor";

export const InfoPage = () => {
    const {spaceId} = useParams()
    const {pageId} = useParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [page, setPage] = useState({})
    const [pageText, setPageText] = useState("")
    const [isContentSaved, setIsContentSaved] = useState(true)

    useEffect(() => {
        if (!!pageId) {
            console.log("LOAD PAGE #" + pageId)
            getPage(spaceId, pageId, (e) => {setPage(e); setPageText(e['html']); setIsContentSaved(true)})
        }
    },[pageId])

    if (!pageId) return <div>
        no content
    </div>

    const handleTextChange = (text) => {
        setPageText(text);
        setIsContentSaved(false);
    };

    return <div className={style.wrapper}>
        <div className={style.actions}>
            <ButtonComp
                text={isEditMode ? "Normal" : "Edit"}
                onClick={() => {setIsEditMode(!isEditMode)}}
            />
            {isEditMode && (
                <ButtonComp
                    text={"save"}
                    onClick={() => {
                        savePage(spaceId, pageId, pageText);
                        setIsContentSaved(true);
                    }}
                />
            )}
        </div>

        {
            isEditMode
                ? <WysiwygEditor
                    text={pageText}
                    setText={handleTextChange}
                    isSaved={isContentSaved}
                />
                : <div className={style.wrapper} dangerouslySetInnerHTML={{__html: pageText}}/>
        }
    </div>
}