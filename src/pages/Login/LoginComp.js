import style from './Login.module.css';
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {useState} from "react";
import {signIn} from "./LoginActions";
import toast from "react-hot-toast";

export const LoginComp = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    return <div className={style.wrapper}>
        <div className={style.title}><h2>Login</h2></div>

        <div className={style.box}><InputTextComp title={"Login"} acceptChanges={setLogin}/></div>
        <div className={style.box}><InputTextComp title={"Password"} acceptChanges={setPassword} type={"password"}/></div>

        <div className={style.panel}>
            <ButtonComp
                text={"Enter"}
                onClick={() => signIn(login, password, toast.error)}
            />
        </div>
    </div>
}