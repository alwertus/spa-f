import React, {useState} from "react";
import style from "./styles.module.css";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {DoingsReportResult} from "../../../features/DoingsReportResult";
import {DatePicker} from "../../../shared/ui/DatePicker";
import {Periods} from "../../../shared/const/Periods";

export const DoingsReport = () => {
    const [period, setPeriod] = useState(Periods.DAY)
    const [date, setDate] = useState(new Date())

    return <div className={style.wrapper}>
        <div className={style.line}>
            <div className={style.lineElement}><h3>Date: </h3></div>
            <ButtonComp
                text="&larr;"
                onClick={() => {setDate(period.increaseDate(date, -1))}}
                tooltipText={"Previous " + period.name}
            />
            <DatePicker
                date={date}
                setDate={setDate}
            />
            <ButtonComp
                text="&rarr;"
                onClick={() => {setDate(period.increaseDate(date, 1))}}
                tooltipText={"Next " + period.name}
            />
        </div>

        <div className={style.line}>
            <div className={style.lineElement}><h3>Period: </h3></div>
            {Object.values(Periods).map(e =>
                <div key={e.name}
                    className={style.lineElement}>
                    <ButtonComp
                        text={e.name}
                        onClick={() => {setPeriod(e)}}
                    />
                </div>
            )}
        </div>

        <DoingsReportResult
            startDate={period.getIntervalByDate(date).start}
            endDate={period.getIntervalByDate(date).end}
        />
    </div>
}