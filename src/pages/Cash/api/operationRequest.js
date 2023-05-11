import {OPERATION_URL} from '../const/attr';
import {sendDeleteMsg, sendGetMsg, sendPostMsg, sendPutMsg} from '../../../shared/api/SendMsg';
import toast from "react-hot-toast";

export function createOperation(walletCellSource, walletCellDestination, product, sum, compositeSum, successHandler) {
    const body = {
        product: product,
        sum: sum}
    if (!!walletCellSource) body.walletCellSource = {id: walletCellSource.id}
    if (!!walletCellDestination) body.walletCellDestination = {id: walletCellDestination.id}

    sendPostMsg(OPERATION_URL, body, successHandler)
}

export function getOperations(successHandler) {
    sendGetMsg(OPERATION_URL, {},
        successHandler,
    )
}

export function removeOperation(id, successHandler) {
    sendDeleteMsg(OPERATION_URL + "/" + id,
        {},
        successHandler
    )
}

export function updateOperation(updatedObject, successHandler) {
    sendPutMsg(OPERATION_URL,
        updatedObject,
        successHandler,
        err => toast.error(err)
    )
}
