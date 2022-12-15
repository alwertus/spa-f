import style from './App.module.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import {ButtonComp} from "../common/components/Button/ButtonComp";
import {ReactComponent as AccountIcon} from "../common/img/account.svg"
import {LoginComp} from "../pages/Login/LoginComp";
import {MainComp} from "../pages/Main/MainComp";

const App = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const history = useNavigate()

/*    function loginOnClick() {
        sendMsg()
    }*/

    return <div className={style.wrapper}>
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
            </Routes>
        </div>
    </div>
}

export default App;