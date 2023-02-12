import toast from "react-hot-toast";
import {sendDeleteMsg, sendGetMsg, sendPostMsg, sendPutMsg} from "../../common/SendMsg";

const URL_SPACE = "info-space"
const URL_PAGE = "info-page"

export function getSpacesList(isPrivate = true, successHandler) {
    sendGetMsg(URL_SPACE,
        {"isPrivate" : isPrivate},
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function createSpace(title, access = true, successHandler) {
    sendPostMsg(URL_SPACE,
        {
            "title" : title,
            "isPrivate" : access
        },
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function updateSpace(obj, successHandler) {
    sendPutMsg(URL_SPACE,
        obj,
        successHandler,
        (msg) => {toast.error(msg)}
    )
}
export function deleteSpace(id, successHandler) {
    sendDeleteMsg(URL_SPACE,
        {"id": id},
        successHandler,
        (msg) => {toast.error(msg)}
    )
}

export function getPageList(spaceId, setPageList) {
    sendGetMsg(
        URL_PAGE + "/list",
        {"spaceId" : spaceId},
        (e) => {
            setPageList([{
                id: null,
                title: "root",
                position: 0,
                spaceId: spaceId,
                children: e
            }])
        },
        (msg) => {toast.error(msg)}
    )
}

export function createPage(spaceId, title, parentId, invokeRefreshPageList) {
    if (!title || title === "") return;
    console.log("CREATE space='" + spaceId + "', parent=" + parentId + " title=" +  title)
    sendPostMsg(URL_PAGE,
        {"spaceId": spaceId,
            "title": title,
            "parentId": parentId
        },
        invokeRefreshPageList
    )
}

export function deletePage(spaceId, pageId, invokeRefreshPageList) {
    sendDeleteMsg(URL_PAGE,
        {"spaceId": spaceId,
            "id": pageId
        },
        invokeRefreshPageList,
        (msg) => {toast.error(msg)}
    )
}

export function changePosition(spaceId, pageId, newPosition, invokeRefreshPageList) {
    sendPutMsg(URL_PAGE + "/list",
        {"spaceId": spaceId,
            "id": pageId,
            "position": newPosition
        },
        invokeRefreshPageList
    )
}