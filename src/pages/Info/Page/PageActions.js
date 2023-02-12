import {sendGetMsg} from "../../../common/SendMsg";

const URL_PAGE = "info-page"

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