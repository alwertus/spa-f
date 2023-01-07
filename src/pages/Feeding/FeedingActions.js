import {sendMsg} from "../../common/SendMsg";

export function getAccessStatus(setIsPageCreated) {
    sendMsg("POST", "api/feeding/getAccessStatus",{},
        rs => {
            setIsPageCreated((rs['text'] === 'true'))
        })
}

export function createAccess(setIsPageCreated) {
    sendMsg("POST", "api/feeding/createAccess",{},
        () => {
            setIsPageCreated(true)
        })
}

export function getData(setData, setLastTimerId, setInterval) {
    sendMsg("POST", "api/feeding/getData",{},
        rs => {
            setData(rs['feedingList'])
            setLastTimerId(rs['lastTimerId'])
            setInterval(rs['interval'])
        })
}

export function newTimer(breast, updateData) {
    sendMsg("POST", "api/feeding/addTimer",{breast: breast},
        () => {
            updateData()
        })
}

export function setNewInterval(newInterval) {
    let time = newInterval.split(":")
    let h = time[0]
    let m = time[1]

    if (isNaN(h) || isNaN(m))
        return

    sendMsg("POST", "api/feeding/setNewInterval",{hour: time[0], min: time[1]})
}

export function getInviteString(setInviteString) {
    sendMsg("POST", "api/feeding/getInviteString",{},
        rs => {
            setInviteString(rs['text'])
        })
}

export function setInviteString(inviteString, setIsPageCreated) {
    sendMsg("POST", "api/feeding/addAccess",{value: inviteString},
        () => {
            setIsPageCreated(true)
        })
}