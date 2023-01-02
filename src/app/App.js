import style from './App.module.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {ButtonComp} from "../common/components/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../common/img/account.svg"
import {LoginComp} from "../pages/Login/LoginComp";
import {MainComp} from "../pages/Main/MainComp";
import {Toaster} from "react-hot-toast";
import {RegisterComp} from "../pages/Login/RegisterComp";

const App = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const history = useNavigate()

    return <div className={style.wrapper}>
        <div><Toaster/></div>
        <div className={style.topLine}>
            <ButtonComp
                text={"Main"}
                onClick={() => history("/")}
            />
            <ButtonComp
                tooltipText={"Login"}
                onClick={() => history("/login")}
                icon={<AccountIcon/>}
            />
        </div>

        <div className={style.pageContent}>
            <Routes>
                <Route path={"/"} element={<MainComp/>}/>
                <Route path={"/login"} element={<LoginComp/>}/>
                <Route path={"/register"} element={<RegisterComp/>}/>
            </Routes>
        </div>
    </div>
}

export default App;