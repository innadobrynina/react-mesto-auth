import headerLogo from "../images/logo.svg";
import { NavLink, useLocation } from 'react-router-dom';


function Header({ email, loggedIn, signOut }) {
    const { pathname } = useLocation();
    return (
        <div className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип" />
            {loggedIn && (
                <div className="header__container">
                    <address className="header__address">{email}</address>
                    <p className="header__user-info"></p>
                    <nav className="header__navigation">
                        <button className="header__link header__button" type="button" onClick={signOut}>Выйти</button>
                    </nav>
                </div>
            )}
            {!loggedIn && (
                <nav className="header__navigation">
                    {pathname === "/sign-in" && (
                        <NavLink to="/sign-up" className="header__link">
                            Регистрация
                        </NavLink>
                    )}
                    {pathname === "/sign-up" && (
                        <NavLink to="/sign-in" className="header__link">
                            Войти
                        </NavLink>
                    )}
                </nav>
            )}
        </div>
    );
}
export default Header;