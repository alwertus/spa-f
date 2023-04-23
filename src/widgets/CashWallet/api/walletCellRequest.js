import {WALLET_CELL_URL} from '../const/attr';
import {sendDeleteMsg, sendPostMsg, sendPutMsg} from '../../../shared/api/SendMsg';

export function createCell(walletId, name, icon, successHandler) {
    if (!walletId || !name) return;

    sendPostMsg(WALLET_CELL_URL, {
            name: name,
            walletId: walletId,
            icon: icon,
        },
        successHandler
    )
}

export function removeCell(id, successHandler) {
    sendDeleteMsg(WALLET_CELL_URL + "/" + id,
        {},
        successHandler
    )
}

export function updateCell(updatedCell, successHandler) {
    sendPutMsg(WALLET_CELL_URL,
        updatedCell,
        successHandler,
    )
}
