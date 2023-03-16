import {useEffect, useState} from 'react';
import {getData} from '../api/request';

const TaskButtonLogic = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData(setData)
    }, [])

    return data
}

export default TaskButtonLogic;
