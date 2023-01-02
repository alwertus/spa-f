import style from './Login.module.css';
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {useState} from "react";
import {register} from "./LoginActions";
import {useNavigate} from "react-router-dom";

export const RegisterComp = () => {

    const [login, setLogin] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const history = useNavigate()

    const clearFields = () => {
        setLogin("")
        setEmail("")
        setPassword("")
        setPasswordConfirm("")
    }

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>New user</h2></div>

            <div className={style.box}><InputTextComp title={"Login"} acceptChanges={setLogin}/></div>
            <div className={style.box}><InputTextComp title={"Email"} acceptChanges={setEmail}/></div>
            <div className={style.box}><InputTextComp title={"Password"} acceptChanges={setPassword} type={"password"}/></div>
            <div className={style.box}><InputTextComp title={"Password (confirm)"} acceptChanges={setPasswordConfirm} type={"password"}/></div>

            <div className={style.panel}>
                <ButtonComp
                    text={"Register"}
                    onClick={() => {register(login, email, password, passwordConfirm, clearFields)}}
                />
            </div>
        </div>
        <div className={style.links}>
            <div className={style.link} onClick={() => history("/login")}>I have account</div>
        </div>
    </div>
}