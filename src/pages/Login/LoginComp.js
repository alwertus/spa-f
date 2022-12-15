import style from './Login.module.css';
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {useState} from "react";

export const LoginComp = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    return <div className={style.wrapper}>
        <h2>Login</h2>
        <hr/>
        <div className={style.box}><InputTextComp title={"Login"} acceptChanges={setLogin}/></div>
        <div className={style.box}><InputTextComp title={"Password"} acceptChanges={setPassword} type={"password"}/></div>

        <div className={style.panel}>
            <ButtonComp
                text={"Enter"}
                onClick={() => console.log("click Login: ", login, password)}
            />
        </div>
    </div>
}