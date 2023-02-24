import {sendGetMsg, sendPutMsg} from "../../../shared/api/SendMsg";
import {URL_PAGE} from "../const/attr";

export function getPage(spaceId, pageId, setPage) {
    sendGetMsg(
        URL_PAGE,
        {
            "spaceId": spaceId,
            "pageId": pageId
        },
        setPage
    )
}
export function savePage(spaceId, pageId, text) {
    sendPutMsg(
        URL_PAGE,
        {
            "spaceId": spaceId,
            "id": pageId,
            "html": text
        }
    )
}