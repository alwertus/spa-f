/* !!! All requests must be use this method !!! */

import {getLocalStorageValue} from "./LocalStorage";
import {AUTH} from "./Structures";

const DEBUG = true
const SERVER_PORT = 9000
const SERVER_ADDRESS = (window.location.port > 0 ? window.location.origin.replace((":" + window.location.port), "") : window.location.origin) + ":" + SERVER_PORT

const headers = new Headers()
headers.append("Content-Type", "application/json")

const statusActions = new Map()
statusActions.set(400, (rs, success, error) => {error(rs['description'])})
statusActions.set(200, (rs, success) => {success(rs)})


export function sendMsg(method,
                        destination,
                        bodyObj,
                        successHandler = () => {},
                        errorHandler = () => {},
                        ) {
    const url = SERVER_ADDRESS + "/" + destination
    const token = getLocalStorageValue(AUTH.TOKEN)
    if (!!token) headers.append("Authorization", token)

    const answerIsJson = (rs) => {
        if (DEBUG) console.log("<< Response JSON (" + rsStatus + ")", rs)
        statusActions.get(rsStatus)(rs, successHandler, errorHandler)
    }

    const answerIsText = (text) => {
        if (DEBUG) console.error("<< Response TEXT (" + rsStatus + ")", text)
        errorHandler(text)
    }

    if (DEBUG) console.log(">> Send message [" + method + "] " + url, bodyObj)
    let rsStatus = 0;
    fetch(url,{
        method: method,
        headers: headers,
        body: JSON.stringify(bodyObj)

    })
        .then((response) => {
            rsStatus = response.status
            return response.text()})
        .then((response) => {
            try {
                const data = JSON.parse(response)
                answerIsJson(data)
            } catch (err) {
                answerIsText(response)
            }
        }).catch( e => {
        errorHandler("<< ERROR" + e)
    });
}