import React from 'react';
import style from './DoingsReportResult.module.css';
import ReportData from '../model/ReportData';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {CombineReportDataByLabel, CombineReportDataByTask} from "../model/CombineReportData";
import {ReactComponent as RefreshIcon} from "../../../shared/ui/img/refresh.svg";

export const DoingsReportResult = ({startDate, endDate}) => {
    const {data, update} = ReportData(startDate, endDate);

    return <div className={style.wrapper}>
        <div className={style.line}>
            <ButtonComp
                icon={<RefreshIcon/>}
                onClick={update}
            />
        </div>

        <table>
            <tbody>

            <tr>
                <td><b>Task</b></td>
                <td><b>Duration</b></td>
                <td><b>Percent</b></td>
                <td><b>Count</b></td>
                <td><b>AVG</b></td>
            </tr>

            {CombineReportDataByTask(data).map(e => <tr key={e.name}>
                <td>{e.name}</td>
                <td>{Math.round(e.duration)}</td>
                <td>{Math.round(e.percent)}</td>
                <td>{e.count}</td>
                <td>{Math.round(e.duration / e.count)}</td>
            </tr>)}

            </tbody>
        </table>

        <table>
            <tbody>
            <tr>
                <td><b>Label</b></td>
                <td><b>Duration</b></td>
                <td><b>Percent</b></td>
                <td><b>Count</b></td>
                <td><b>AVG</b></td>
            </tr>

            {CombineReportDataByLabel(data).map(e => <tr key={e.name}>
                <td>{e.name}</td>
                <td>{Math.round(e.duration)}</td>
                <td>{Math.round(e.percent)}</td>
                <td>{e.count}</td>
                <td>{e.count === 0 ? 0 : Math.round(e.duration / e.count)}</td>
            </tr>)}

            </tbody>
        </table>
    </div>
}
