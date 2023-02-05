import React, {useEffect, useState} from "react";
import style from "./Select.module.css";
import {OptionComp} from "./OptionComp";

export const SelectComp = ({
    values = [],
    defaultText = "Select...",
    onChange = (ignored) => {},
    defaultSelectedValue = null,
    ATTRIBUTE_TITLE = 'title',
}) => {
    const [selected, setSelected] = useState(defaultSelectedValue)
    const [showOptionsList, setShowOptionsList] = useState(false)

    useEffect(() => {
        setSelected(!!defaultSelectedValue ? defaultSelectedValue[ATTRIBUTE_TITLE] : defaultText)
    }, [defaultSelectedValue])

    function selectItem(element) {
        setSelected(element.title)
        setShowOptionsList(false)
        onChange(element)
    }
    function getSelectedText() {
        return !selected
            ? defaultText
            : selected
    }

    return <div className={style.wrapper}>

        <div className={style.selected}
             onClick={() => setShowOptionsList(!showOptionsList)}>
            {getSelectedText()}
            <div className={style.openOptions}>	&#9776;</div>

        </div>

        {showOptionsList && <div className={style.options}>
            {values.map(e =>
                <OptionComp key={e.id}
                            title={e.title}
                            onClick={() => {selectItem(e)}}
                />)}
        </div>}

    </div>
}