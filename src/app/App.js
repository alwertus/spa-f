import style from './App.module.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {ButtonComp} from "../shared/ui/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../shared/ui/img/account.svg"
import {LoginComp} from "../pages/Login/LoginComp";
import {MainComp} from "../pages/Main/MainComp";
import {Toaster} from "react-hot-toast";
import {RegisterComp} from "../pages/Login/RegisterComp";
import {AccountConfirmComp} from "../pages/AccountConfirm/AccountConfirmComp";
import {useEffect, useState} from "react";
import {LogoutComp} from "../pages/Login/LogoutComp";
import {getLocalStorageValue} from "../shared/lib/LocalStorage";
import {AUTH} from "../shared/const/Structures";
import {getUserInfo} from "./AppActions";
import {PhoneComp} from "../pages/Phone/PhoneComp";
import {FeedingComp} from "../pages/Feeding/FeedingComp";
import {InfoComp} from "../pages/Info/InfoComp";
import {PageDoings} from "../pages/Doings";
import {Cash} from "../pages/Cash";
import {AdminComp} from "../pages/AdminPage/AdminComp";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const history = useNavigate()
    const [paths, setPaths] = useState({cash: ""})

    const savePath = (key) => {
        return (value) => setPaths((prev) => ({...prev, [key]: value}))
    }
    const getPath = (page) => {
        if (!paths[page])
            return "/" + page

        return "/" + page + "/" + paths[page]
    }

    const loginCheck = () => {
        if (!isAuthenticated) {
            let token = getLocalStorageValue(AUTH.TOKEN)
            if (!!token) {
                getUserInfo(token, setIsAuthenticated, setUserData)
            }
        }
    }

    useEffect(loginCheck,[isAuthenticated])

    function hasRole(role) {
        return !!userData['roles'] && userData['roles'].includes(role)
    }

    const pageCash = () => <Cash savePath={savePath("cash")}/>

    return <div className={style.wrapper}>
        <div><Toaster/></div>
        <div className={style.topLine}>
            <div className={style.buttonGroup}>
                <ButtonComp
                    text={"Main"}
                    onClick={() => history("/")}
                />
                {hasRole("PAGE_INFO") && <ButtonComp
                    tooltipText={"Knowledge base"}
                    text={"Info"}
                    onClick={() => history("/info")}
                />}
                {hasRole("PAGE_FEEDING") && <ButtonComp
                    tooltipText={"Baby feeding"}
                    text={"Feeding"}
                    onClick={() => history("/feeding")}
                />}
                {hasRole("PAGE_PHONE") && <ButtonComp
                    tooltipText={"Remote phone"}
                    text={"Phone"}
                    onClick={() => history("/phone")}
                />}
                {hasRole("PAGE_DOINGS") && <ButtonComp
                    tooltipText={"Time fixation"}
                    text={"Doings"}
                    onClick={() => history("/doings")}
                />}
                {hasRole("PAGE_CASH") && <ButtonComp
                    tooltipText={"Cash control"}
                    text={"Cash"}
                    onClick={() => history(getPath("cash"))}
                />}
                {hasRole("USER") && <ButtonComp
                    tooltipText={"Admin page"}
                    text={"Admin page"}
                    onClick={() => history("/admin")}
                />}
            </div>

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
                <Route path={"/admin"} element={<AdminComp/>}/>
                <Route path={"/register"} element={<RegisterComp/>}/>
                <Route path={"/emailConfirm/:secret"} element={<AccountConfirmComp/>}/>
                {hasRole("PAGE_INFO") && <Route path={"/info"} element={<InfoComp/>}/>}
                {hasRole("PAGE_INFO") && <Route path={"/info/:visibility"} element={<InfoComp/>}/>}
                {hasRole("PAGE_INFO") && <Route path={"/info/:visibility/:spaceId"} element={<InfoComp/>}/>}
                {hasRole("PAGE_INFO") && <Route path={"/info/:visibility/:spaceId/:pageId"} element={<InfoComp/>}/>}
                {hasRole("PAGE_PHONE") && <Route path={"/phone"} element={<PhoneComp/>}/>}
                {hasRole("PAGE_FEEDING") && <Route path={"/feeding"} element={<FeedingComp/>}/>}
                {hasRole("PAGE_DOINGS") && <Route path={"/doings"} element={<PageDoings/>}/>}
                {hasRole("PAGE_CASH") && <Route path={"/cash"} element={pageCash()}/>}
                {hasRole("PAGE_CASH") && <Route path={"/cash/:tab"} element={pageCash()}/>}
            </Routes>
        </div>
    </div>
}

export default App;