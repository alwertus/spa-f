import React, {useEffect, useState} from "react";
import style from "./Feeding.module.css";
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {createAccess, getAccessStatus, setInviteString} from "./FeedingActions";
import {FeedingDataComp} from "./FeedingDataComp";
import {str} from "../../common/Language";

export const FeedingComp = ({}) => {
    const [isPageCreated, setIsPageCreated] = useState(false)

    useEffect(() => {if (!isPageCreated) getAccessStatus(setIsPageCreated)}, [isPageCreated])

    if (isPageCreated)
        return <FeedingDataComp/>
    else
        return <div className={style.wrapper}>
            <h2>{str("First run")}</h2>

            <div className={style.createNewButton}>
                <ButtonComp
                    text={str("Create new")}
                    onClick={() => createAccess(setIsPageCreated)}
                />
            </div>
            {str("or")}
            <InputTextComp
                title={str("Use access string")}
                hideOkBtn={false} // TODO: make this function
                acceptChanges={(newVal) => {
                    if (!!newVal)
                        setInviteString(newVal, setIsPageCreated)
                }}
            />

        </div>
}