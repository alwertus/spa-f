/* !!! All requests must be use this method !!! */

import {getLocalStorageValue} from "./LocalStorage";
import {AUTH} from "./Structures";

const DEBUG = true
const SERVER_PORT = 9000
const SERVER_ADDRESS = (window.location.port > 0 ? window.location.origin.replace((":" + window.location.port), "") : window.location.origin) + ":" + SERVER_PORT
const headers = new Headers()
headers.append("Content-Type", "application/json")

export function sendMsg(method,
                        destination,
                        bodyObj,
                        successHandler = () => {},
                        errorHandler = () => {},
                        ) {
    const url = SERVER_ADDRESS + "/" + destination
    const token = getLocalStorageValue(AUTH.TOKEN)
    const resultErr = errorText => {
        errorHandler(errorText)
        if (DEBUG) console.error(errorText)
    }

    if (!!token) headers.append("Authorization", token)

    if (DEBUG) console.log(">> SEND MESSAGE [" + method + "] " + url, bodyObj)

    const jsonHandler = (rs) => {
        if (DEBUG) console.log("<< Response JSON (" + rsStatus + ")", rs)
        if (rsStatus === 400)
            errorHandler(rs['description'])
    }

    const textHandler = (text) => {
        if (DEBUG) console.error("<< Response TEXT (" + rsStatus + ")", text)
        errorHandler(text)
    }

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyObj)

    })
        .then((response) => {
            rsStatus = response.status
            return response.text()})
        .then((response) => {
            try {
                const data = JSON.parse(response)
                jsonHandler(data)
            } catch (err) {
                textHandler(response)
            }
        }).catch( e => {
        resultErr("<< ERROR" + e)
    });
}