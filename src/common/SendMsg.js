/* !!! All requests must be use this method !!! */

const DEBUG = true;
const SERVER_ADDRESS = (window.location.port > 0 ? window.location.origin.replace((":" + window.location.port), "") : window.location.origin) + ":9000";

export function sendMsg() {
    console.log(">> SEND MESSAGE TO: " + SERVER_ADDRESS)
}