import style from './Login.module.css';
import {InputTextComp} from "../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../shared/ui/Button/ButtonComp";
import {useState} from "react";
import {signIn} from "./LoginActions";
import {useNavigate} from "react-router-dom";

export const LoginComp = ({   setUserData,
                              setIsAuthenticated}) => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate()

    const onClickEnter = () => {
        signIn(login, password, setIsAuthenticated, setUserData)
    }

    const onKeyPressTextField = (event) => {
        if (event.key === "Enter") {
            onClickEnter()
        }
    }

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>Sign in</h2></div>

            <div className={style.box}><InputTextComp title={"Login"} acceptChanges={setLogin}/></div>
            <div className={style.box}><InputTextComp title={"Password"} acceptChanges={setPassword} type={"password"} onKeyPress={onKeyPressTextField}/></div>

            <div className={style.panel}>
                <ButtonComp
                    text={"Enter"}
                    onClick={onClickEnter}
                />
            </div>
        </div>

        <div className={style.links}>
            <div className={style.link} onClick={() => history("/register")}>I have not account</div>
        </div>
    </div>
}