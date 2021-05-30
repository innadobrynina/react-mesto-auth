import headerLogo from "../images/logo.svg";


function Header() {
    return (
        <div className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип" />

            <div className="header__container">
                <p className="header__user-info"></p>
                <button className="header__link" type="button">Регистрация</button>
            </div>

        </div>
    );
}
export default Header;