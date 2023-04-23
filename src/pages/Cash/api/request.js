import {URL} from '../const/attr';
import {sendGetMsg} from '../../../shared/api/SendMsg';

export function getData(setDataHandler) {
    sendGetMsg(URL,
        {},
        setDataHandler,
        (e) => {console.log(e)}
    )
}
