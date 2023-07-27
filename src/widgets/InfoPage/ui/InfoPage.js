import React, {useEffect, useState} from "react";
import style from "./styles.module.css";
import {useParams} from "react-router-dom";
import {getPage, savePage} from "../api/actions";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {WysiwygEditor} from "../../../features/WysiwygEditor";
import {InfoPageData} from "../model/InfoPageData";

export const InfoPage = () => {
    const {spaceId} = useParams()
    const {pageId} = useParams()
    const [isEditMode, setIsEditMode] = useState(false)

    const {
        setPageData,
        data,
        setHtml,
    } = InfoPageData()

    useEffect(() => {
        if (!!pageId) {
            console.log("LOAD PAGE #" + pageId)
            getPage(spaceId, pageId, setPageData)
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
                        savePage(spaceId, pageId, data.pageText, setHtml)
                        data.setTmpPageText(data.pageText)
                    }}
                />
            )}
        </div>

        {
            isEditMode
                ? <WysiwygEditor
                    text={data.pageText}
                    setText={data.setPageText}
                    hasUnsavedChanges={data.pageText !== data.tmpPageText}
                />
                :
                <div className={style.wrapper} dangerouslySetInnerHTML={{__html: data.pageText}}/>
        }
    </div>
}