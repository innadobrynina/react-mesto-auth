import headerLogo from "../images/logo.svg";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';


function Header({ email, loggedIn, signOut }) {

    return (
        <div className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип" />
            {loggedIn ? (

                <div className="header__container">
                    <>
                        <address className="header__address">{email}</address>
                        <p className="header__user-info"></p>
                        <nav className="header__navigation">
                            <button to="" className="header__link header__button" type="button" onClick={signOut}>Выйти</button>
                        </nav>
                    </>
                </div>

            ) : (
                <BrowserRouter >
                    <Switch>
                        <Route path="/sign-up">
                            <Link to="/sign-in" className="header__link">Войти</Link>
                        </Route>
                        <Route path="/sign-in">
                            <Link to="/sign-up" className="header__link">Регистрация</Link>
                        </Route>
                    </Switch>
                </BrowserRouter >
            )
            }
        </div>
    )
}
export default Header;