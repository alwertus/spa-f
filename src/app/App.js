import style from './App.module.css';
import {useState} from "react";
import {sendMsg} from "../common/SendMsg";
import {ButtonComp} from "../common/components/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../common/img/account.svg"

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function loginOnClick() {
        sendMsg()
    }

    return <div className={style.wrapper}>
        <div className={style.topLine}>
            <div>TOP LINE</div>
            <ButtonComp
                tooltipText={"Login"}
                onClick={loginOnClick}
                icon={<AccountIcon/>}
            />
        </div>
        {isAuthenticated ? "AUTH: YES" : "AUTH: NO"}
1
    </div>
}

export default App;