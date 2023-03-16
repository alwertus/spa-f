import style from "./DatePicker.module.css";
import React from "react";

export const DrawDates = ({onClickHandler, dates}) =>
    <table>
        <tbody>
        <tr>{[{id: -100, name: 'Mo'}, {id: -101, name: 'Tu'}, {id: -102, name: 'We'}, {id: -103, name: 'Th'},
            {id: -104, name: 'Fr'}, {id: -105, name: 'Sa'}, {id: -106, name: 'Su'}]
            .map(e => <td key={e.id}>
                <div className={style.cellHeader}>
                    {e.name}
                </div>
            </td>)
        }</tr>
        {!!dates && dates.map(line => <tr key={200 + line[0]}>{!!line && line.map((e, num) =>
            <td key={e}>
                {e > 0 && e < 100 ?
                    <div className={style.cell + (num > 4 ? " " + style.celWeekend : "")}
                         onClick={() => {onClickHandler(e)}}>
                        {e}
                    </div> : <div/>}
            </td>
        )}</tr>)}
        </tbody>
    </table>