import React, {useEffect, useState} from "react";
import style from "./AccountConfirm.module.css";
import {useParams} from "react-router-dom";
import {confirmEmail} from "./AccountConfirmActions";
import {ReactComponent as LoadingIcon} from "../../common/img/loading.svg"

export const AccountConfirmComp = () => {
    const {secret} = useParams()
    const [step, setStep] = useState("waiting")
    const [text, setText] = useState("")

    const draw = {
        waiting: <div className={style.centerContainer}>
            <div className={style.line}>Please, wait</div>
            <div className={style.line}>
                <div className={style.loading}><LoadingIcon/></div>
            </div>
        </div>,
        error: <div className={style.error}>{text}</div>,
        success: <div className={style.success}>{"Email confirmation: Success"}</div>,
    }

    useEffect(() => secret && confirmEmail(secret, setStep, setText), [secret])

    return <div className={style.wrapper}>
        {draw[step]}
    </div>
}