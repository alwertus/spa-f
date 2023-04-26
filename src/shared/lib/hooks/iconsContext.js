import {createContext, useContext, useEffect, useState} from "react";
import {sendGetMsg} from "../../api/SendMsg";

const IconsContext = createContext(undefined);

export const useIcons = () => {
    return useContext(IconsContext)
}

export const IconsProvider = ({children}) => {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        sendGetMsg("icon",{}, setIcons)
    }, [])

    return <IconsContext.Provider value={icons}>{children}</IconsContext.Provider>
};
