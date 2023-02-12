import React, {useEffect, useState} from "react";
import style from "./Page.module.css";
import {useParams} from "react-router-dom";
import {getPage} from "./PageActions";
import {ButtonComp} from "../../../common/components/Button/ButtonComp";

export const PageComp = () => {
    const {spaceId} = useParams()
    const {pageId} = useParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [page, setPage] = useState({})

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

        <ButtonComp
            text={isEditMode ? "Normal" : "Edit"}
            onClick={() => {setIsEditMode(!isEditMode)}}
        />
        {
            isEditMode
                ? <div>EDIT MODE</div>
                : <div className={style.wrapper} dangerouslySetInnerHTML={{__html: page['html']}}/>
        }
    </div>
}