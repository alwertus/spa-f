function fillStruct(prefix, obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "string")
                obj[key] = prefix + "__" + key;
            else fillStruct(prefix + "__" + key, obj[key])
        }
    }
    return obj
}

export const ELEMENT_POSITION = fillStruct("ELEMENT_POSITION", {
    BEFORE : "",
    AFTER: "",
})

export const AUTH = {
    TOKEN : "accessToken",
    TOKEN_REFRESH : "refreshToken",
}