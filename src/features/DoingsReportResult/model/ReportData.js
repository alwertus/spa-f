import {useEffect, useState} from 'react';
import {loadData} from '../api/request';

const ReportData = (startDate, endDate) => {
    const [data, setData] = useState([])
    function refreshData() {
        loadData(startDate, endDate, setData)
    }

    useEffect(() => {
        refreshData()
    }, [startDate, endDate])

    return {data, update: refreshData}
}

export default ReportData;
