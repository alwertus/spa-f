/* !!! All requests must be use this method !!! */

import {getLocalStorageValue, setLocalStorageValue} from "./LocalStorage";
import {AUTH} from "./Structures";

const DEBUG = true
const SERVER_PORT = 9000
// const SERVER_ADDRESS = (window.location.port > 0 ? window.location.origin.replace((":" + window.location.port), "") : window.location.origin) + ":" + SERVER_PORT
const SERVER_ADDRESS = "http://alwertus.zapto.org/spab"
const MSG_DESCRIPTION = "description"

function addParamsToUrl(url, params) {
    const u = new URL(url)
    for (const [key, value] of Object.entries(params)) {
        u.searchParams.append(key, String(value))
    }
    return u.href
}


export function sendMsg(method,
                        destination,
                        bodyObj,
                        successHandler = () => {},
                        errorHandler = () => {},
                        isResending = false,
                        useRefreshToken = false,
                        ) {
    // prepare url
    let url = SERVER_ADDRESS + "/" + destination
    if (method === "GET") {
        url = addParamsToUrl(url, bodyObj)
    }

    // prepare headers
    const token = getLocalStorageValue(useRefreshToken ? AUTH.TOKEN_REFRESH : AUTH.TOKEN)
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    if (!!token) headers.append("Authorization", token)

    // result status reactions
    const statusActions = new Map()
    statusActions.set(200, (rs) => {successHandler(rs)})
    statusActions.set(400, (rs) => {errorHandler(rs[MSG_DESCRIPTION])})
    statusActions.set(401, (rs) => {
        if (rs[MSG_DESCRIPTION].startsWith("The Token has expired") && !isResending) {
            sendMsg("POST",
                "user/update-token",
                {},
                (response) => {
                    setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
                    setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])

                    sendMsg(method, destination, bodyObj, successHandler, errorHandler, true)
                },
                (msg) => {
                    setLocalStorageValue(AUTH.TOKEN, null, true)
                    setLocalStorageValue(AUTH.TOKEN_REFRESH, null, true)
                    errorHandler("Resending error - " + msg)
                },
                true,
                true
            )
        } else {
            errorHandler(rs[MSG_DESCRIPTION])
        }
    })
    statusActions.set(403, () => {errorHandler("Forbidden")})

    // handler if answer is json
    const answerIsJson = (rs) => {
        if (DEBUG) console.log("<< Response JSON (" + rsStatus + ")", rs)
        statusActions.get(rsStatus)(rs)
    }

    // handler if answer is text
    const answerIsText = (text) => {
        if (DEBUG) {
            if (rsStatus === 200) console.log("<< Response (" + rsStatus + ")", text)
            else console.error("<< Response TEXT (" + rsStatus + ")", text)
        }

        statusActions.get(rsStatus)(text)
    }

    // fetch
    if (DEBUG) console.warn(">> Send " + (isResending ? "resending " : "") + "message [" + method + "] " + url, method === "GET" ? "" : bodyObj)
    let rsStatus = 0;
    fetch(url,
        method === "GET"
            ? { method: method, headers: headers }
            : { method: method,
                headers: headers,
                body: JSON.stringify(bodyObj)}
    )
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