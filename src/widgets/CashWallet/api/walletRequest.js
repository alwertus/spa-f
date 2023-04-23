import {CURRENCY_URL, WALLET_URL} from '../const/attr';
import {sendDeleteMsg, sendGetMsg, sendPostMsg, sendPutMsg} from '../../../shared/api/SendMsg';

export function getCurrencies(setDataHandler) {
    sendGetMsg(CURRENCY_URL,
        {},
        setDataHandler,
        (e) => {console.log(e)}
    )
}

export function getWallets(setDataHandler) {
    sendGetMsg(WALLET_URL,
        {},
        setDataHandler,
        (e) => {console.log(e)}
    )
}

export function createWallet(name, currency, setDataHandler) {
    if (!name || !currency )
        return

    sendPostMsg(WALLET_URL,
        { name: name, currency: currency },
        setDataHandler
    )
}

export function removeWallet(id, setDataHandler) {
    sendDeleteMsg(WALLET_URL + "/" + id,
        {},
        setDataHandler
    )
}

export function updateWallet(updatedWallet, successHandler) {
    sendPutMsg(WALLET_URL,
        updatedWallet,
        successHandler,
    )
}

