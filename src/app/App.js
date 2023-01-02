import style from './App.module.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {ButtonComp} from "../common/components/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../common/img/account.svg"
import {LoginComp} from "../pages/Login/LoginComp";
import {MainComp} from "../pages/Main/MainComp";
import {Toaster} from "react-hot-toast";
import {RegisterComp} from "../pages/Login/RegisterComp";
import {AccountConfirmComp} from "../pages/AccountConfirm/AccountConfirmComp";
import {useEffect, useState} from "react";
import {LogoutComp} from "../pages/Login/LogoutComp";
import {getLocalStorageValue} from "../common/LocalStorage";
import {AUTH} from "../common/Structures";
import {getUserInfo} from "./AppActions";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const history = useNavigate()

    const loginCheck = () => {
        if (!isAuthenticated) {
            let token = getLocalStorageValue(AUTH.TOKEN)
            if (!!token) {
                getUserInfo(token, setIsAuthenticated, setUserData)
            }
        }
    }

    useEffect(loginCheck,[isAuthenticated])

    return <div className={style.wrapper}>
        <div><Toaster/></div>
        <div className={style.topLine}>
            <ButtonComp
                text={"Main"}
                onClick={() => history("/")}
            />
            <ButtonComp
                tooltipText={"Login"}
                text={userData['login']}
                onClick={() => history("/login")}
                icon={<AccountIcon/>}
            />
        </div>

        <div className={style.pageContent}>
            <Routes>
                <Route path={"/"} element={<MainComp/>}/>
                <Route path={"/login"} element={
                    isAuthenticated
                        ? <LogoutComp
                            setIsAuthenticated={setIsAuthenticated}
                            setUserData={setUserData}
                        />
                        : <LoginComp
                            setIsAuthenticated={setIsAuthenticated}
                            setUserData={setUserData}
                        />}
                />
                <Route path={"/register"} element={<RegisterComp/>}/>
                <Route path={"/emailConfirm/:secret"} element={<AccountConfirmComp/>}/>
            </Routes>
        </div>
    </div>
}

export default App;