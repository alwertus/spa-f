import {useState} from "react";

export const InfoPageData = () => {
    const [pageText, setPageText] = useState("");
    const [tmpPageText, setTmpPageText] = useState("");
    const [page, setPage] = useState({})

    const setHtml = (newValue) => {
        setPageText(newValue);
        setTmpPageText(newValue);
    }

    const setPageData = (newValue) => {
        setPage(newValue)
        setHtml(newValue["html"])
    }

    const data = {
        setPageText: setPageText,
        setTmpPageText: setTmpPageText,
        pageText: pageText,
        tmpPageText: tmpPageText,
    }

    return {
        data,
        setHtml,
        setPageData,
    }
}
