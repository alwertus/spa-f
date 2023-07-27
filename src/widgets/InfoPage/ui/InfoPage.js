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
    //перенести в modal
    const [page, setPage] = useState({})
    const [pageText, setPageText] = useState("");
    const [tmpPageText, setTmpPageText] = useState("");

    const setHtml = (newValue) => {
        setPageText(newValue)
        setTmpPageText(newValue)
    }

    useEffect(() => {
        if (!!pageId) {
            console.log("LOAD PAGE #" + pageId)
            //это тоже а то шо бля а ?
            getPage(spaceId, pageId, (e) => {
                setPage(e);
                setPageText(e['html'])
                setTmpPageText(e['html'])
            })
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
            {isEditMode && (
                <ButtonComp
                    text={"save"}
                    onClick={() => {
                        savePage(spaceId, pageId, pageText, setHtml)
                        setTmpPageText(pageText)
                    }}
                />
            )}
        </div>

        {
            isEditMode
                ? <WysiwygEditor
                    text={pageText}
                    setText={setPageText}
                    hasUnsavedChanges={pageText !== tmpPageText}
                />
                :
                <div className={style.wrapper} dangerouslySetInnerHTML={{__html: pageText}}/>
        }
    </div>
}