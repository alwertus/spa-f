import {useEffect, useState} from 'react';
import {getData} from '../api/request';

const CashLogic = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData(setData)
    }, [])

    return data
}

export default CashLogic;
