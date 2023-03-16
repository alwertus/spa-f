import {URL} from '../const/attr';
import {sendGetMsg} from '../../../shared/api/SendMsg';

export function loadData(startDate, endDate, setDataHandler) {
    sendGetMsg(URL,
        {
            start: startDate.getTime(),
            end: endDate.getTime()
        },
        setDataHandler,
        (e) => {console.log(e)}
    )
}
