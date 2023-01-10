import React, {useEffect, useState} from "react";
import style from "./FeedingData.module.css";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {getData, getInviteString, newTimer, setNewInterval} from "./FeedingActions";
import {str} from "../../common/Language";
import {useCountdown} from "../../common/hooks/useCountdown";
import {ReactComponent as InviteIcon} from "../../common/img/invite.svg";
import BreastImage from "../../common/img/breast.png";
import ChestInBraImage from "../../common/img/chest-in-bra.png";

function getDate(millis) {
    if (!millis) return null
    const date = new Date(parseInt(millis))

    const h = date.getHours()
    const m = ('0' + date.getMinutes()).slice(-2)

    return `${h}:${m}`
}

const breast = {
    breastLeft: <img className={style.imageBig} src={BreastImage} alt={"alt"} style={{transform:"scale(-1, 1)"}}/>,
    breastRight: <img className={style.imageBig} src={BreastImage} alt={"alt"} />,
    chestInBraLeft: <img className={style.imageBig} src={ChestInBraImage} alt={"alt"} style={{transform:"scale(-1, 1)"}}/>,
    chestInBraRight: <img className={style.imageBig} src={ChestInBraImage} alt={"alt"} />
}

export const FeedingDataComp = () => {
    const [inviteString, setInviteString] = useState()

    const [data, setData] = useState([])
    const [lastTimerId, setLastTimerId] = useState(undefined)

    const [endDate, setEndDate] = useState(undefined)
    const [isEnd, hours, minutes, seconds] = useCountdown(endDate)
    const [interval, setInterval] = useState("02:00")

    const lastChestData = data.find(e => e['id'] === lastTimerId)
    const lastChest = !!lastChestData ? lastChestData['breast'] : undefined

    const updateData = () => getData(setData, setLastTimerId, setInterval)

    useEffect(updateData, [])

    useEffect(() => {
        if (!lastTimerId) return
        let lastTimer = data.find(e => e['id'] === lastTimerId)['stop']
        let newDate = new Date(lastTimer)
        setEndDate(newDate)

    }, [lastTimerId])

    return <div className={style.wrapper}>
        <div className={style.interval}>
            <span>{str("Interval")}</span>
            <input type="time"
                   required
                   value={interval}
                   onChange={(e) => {
                       setInterval(e.target.value)
                       setNewInterval(e.target.value)
                   }}/>
            <div className={style.invite}>
                {!inviteString && <ButtonComp
                    tooltip={str("Show invite string")}
                    icon={<InviteIcon/>}
                    onClick={() => {getInviteString(setInviteString)}}
                />}
                {!!inviteString && <div className={style.inviteString}>{inviteString}</div>}
            </div>
        </div>
        <div className={style.timer}>
            <div className={isEnd ? style.timerFinished : style.timerInProgress}>
                {(isEnd ? "- " : "") + hours + ":" + minutes + ":" + seconds}
            </div>
        </div>
        <div className={style.actions}>
            <ButtonComp
                className={style.actionsButton}
                size={"Big"}
                icon={lastChest === "L" ? breast.chestInBraLeft : breast.breastLeft}
                tooltipText={str("Left")}
                onClick={() => newTimer("L", updateData)}
            />
            <ButtonComp
                className={style.actionsButton}
                size={"Big"}
                icon={lastChest === "R" ? breast.chestInBraRight : breast.breastRight}
                tooltipText={str("Right")}
                onClick={() => newTimer("R", updateData)}
            />
        </div>
        <div className={style.stat}>
            <table>
                <thead>
                <tr><td>{str("Start")}</td><td>{str("Stop")}</td><td>{str("Breast")}</td></tr>
                </thead>
                <tbody>
                {
                    data.sort((a, b) => parseInt(b['id']) - parseInt(a['id']))
                        .map(e =>
                            <tr key={e['id']} className={lastTimerId === e['id'] ? style.currentTimer : ""}>
                                <td>{getDate(e['start'])}</td>
                                <td>{getDate(e['stop'])}</td>
                                <td>{e['breast'] === 'L' ? str("Left") : str("Right")}</td>
                            </tr>)
                }
                </tbody>
            </table>
        </div>
    </div>
}