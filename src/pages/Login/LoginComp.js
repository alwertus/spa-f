import style from './Login.module.css';
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {useState} from "react";
import {signIn} from "./LoginActions";
import {useNavigate} from "react-router-dom";

export const LoginComp = ({   setUserData,
                              setIsAuthenticated}) => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate()

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>Sign in</h2></div>

            <div className={style.box}><InputTextComp title={"Login"} acceptChanges={setLogin}/></div>
            <div className={style.box}><InputTextComp title={"Password"} acceptChanges={setPassword} type={"password"}/></div>

            <div className={style.panel}>
                <ButtonComp
                    text={"Enter"}
                    onClick={() => signIn(login, password, setIsAuthenticated, setUserData)}
                />
            </div>
        </div>

        <div className={style.links}>
            <div className={style.link} onClick={() => history("/register")}>I have not account</div>
        </div>
    </div>
}