import {sendDeleteMsg, sendGetMsg, sendPostMsg, sendPutMsg} from "../../../shared/api/SendMsg";
import {URL_LABEL, URL_TASK} from "../const/attr";
import toast from "react-hot-toast";

export function getTaskList(setDataHandler) {
    sendGetMsg(URL_TASK,
        {},
        setDataHandler,
        (e) => {toast.error(e)}
    )
}

export function updateTask(element) {
    sendPutMsg(URL_TASK, element)
}

export function removeTask(element) {
    sendDeleteMsg(URL_TASK + "/" + element['id'], {}, toast.success('Task "' + element['name'] + '" deleted'))
}

export function createTask(name, successHandler) {
    sendPostMsg(URL_TASK, {"name": name}, successHandler)
}

export function getLabelList(setDataHandler) {
    sendGetMsg(URL_LABEL,
        {},
        setDataHandler,
        e => {toast.error(e)}
    )
}
export function updateLabel(element) {
    sendPutMsg(URL_LABEL, element)
}

export function removeLabel(element, refreshTaskList) {
    sendDeleteMsg(
        URL_LABEL + "/" + element['id'],
        {},
        () => {
            toast.success('Label "' + element['name'] + '" deleted')
            refreshTaskList()
        },
        (ex) => toast.error("Error " + ex)
    )
}

export function createLabel(name, successHandler) {
    sendPostMsg(URL_LABEL, {"name": name}, successHandler)
}