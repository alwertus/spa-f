import style from './Login.module.css';
import {ButtonComp} from "../../shared/ui/Button/ButtonComp";
import {setLocalStorageValue} from "../../shared/lib/LocalStorage";
import {AUTH} from "../../shared/const/Structures";

export const LogoutComp = ({  setIsAuthenticated,
                               setUserData}) => {

    const logout = () => {
        setIsAuthenticated(false)
        setLocalStorageValue(AUTH.TOKEN, "", true)
        setLocalStorageValue(AUTH.TOKEN_REFRESH, "", true)
        setUserData({})
    }

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>User info</h2></div>

            <div className={style.panel}>
                <ButtonComp
                    text={"Logout"}
                    onClick={logout}
                />
            </div>
        </div>
    </div>
}