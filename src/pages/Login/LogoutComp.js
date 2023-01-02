import style from './Login.module.css';
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {setLocalStorageValue} from "../../common/LocalStorage";
import {AUTH} from "../../common/Structures";

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