import style from "./DatePicker.module.css";
import React from "react";
import {Months} from "../../../const/Months";

export const DrawMonths = ({onClickHandler}) => {

    const rows = []
    for (let i = 0; i < Months.length; i += 4) {
        rows.push(Months.slice(i, i + 4))
    }

    const renderRows = () => {
        return rows.map((row, index) => <tr key={index}>
                    {row.map(month => (
                        <td key={month.id}>
                            <div className={style.cell}
                                 onClick={() => {onClickHandler(month)}}>
                                {month.name.slice(0, 3)}
                            </div>
                        </td>
                    ))}
                </tr>
            )
    }

    return <table>
        <tbody>
            {renderRows()}
        </tbody>
    </table>
}