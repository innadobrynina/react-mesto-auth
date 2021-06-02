import React from 'react';
import headerLogo from "../images/logo.svg";
import { Link, BrowserRouter } from 'react-router-dom';



function Header({
    loggedIn,
    userData,
    handleSignout,
    linkText,
    redirectPath,
    handleMenuClick,
    isOpen
}) {

    const headerClassName = (
        `header ${loggedIn && 'header_type_mobile'}`
    );

    const menuClassName = (
        `menu ${loggedIn && 'menu_type_mobile'} ${isOpen && 'menu_opened'}`
    );

    const buttonClassName = (
        `button button_type_menu ${isOpen && 'button_type_menu_active'}`
    );
    return (
        <div className={headerClassName}>
            <img src={headerLogo} className="header__logo" alt="Логотип" />
            <div className="header__container">
                <BrowserRouter>
                    <nav className={menuClassName}>
                        {/* <address className="header__address">{userData.email}</address> */}
                        {loggedIn && <p className="header__user-info">{userData.email}</p>}
                        {loggedIn ?
                            <Link className="header__link"
                                to="sign-in"
                                onClick={handleSignout}>Выйти</Link>
                            :
                            <Link className="header__link" to={redirectPath}>{linkText}</Link>}

                        {loggedIn && <button className={buttonClassName} onClick={handleMenuClick}></button>}

                    </nav>
                </BrowserRouter>
            </div>
        </div>
    )
}
export default Header;