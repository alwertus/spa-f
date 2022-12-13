import style from './App.module.css';
import {useState} from "react";
import {sendMsg} from "../common/SendMsg";
import {ButtonComp} from "../common/components/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../common/img/account.svg"
import {ELEMENT_POSITION} from "../common/Structures";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function loginOnClick() {
        sendMsg()
    }


    return <div className={style.wrapper}>
        <div className={style.topLine}>
            <div>TOP LINE</div>
            <ButtonComp
                text={"ClickMe"}
                onClick={loginOnClick}
                icon={<AccountIcon/>}
            />
        </div>

        <ButtonComp text={"ClickMe"}
                    onClick={loginOnClick}
                    icon={<AccountIcon/>}
        />
        <ButtonComp text={"ClickMe"}
                    onClick={loginOnClick}
                    icon={<AccountIcon/>}
                    iconPosition={ELEMENT_POSITION.AFTER}
        />

    </div>
}

export default App;