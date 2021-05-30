import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(password, email);
    }

    return (
        <div className="register">
            <h2 className="register__header">Вход</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input className="register__form-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                <input className="register__form-input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={handlePasswordChange}
                    value={password} />

                <button type="submit" className="register__form-submit-btn">Зарегистрироваться</button>
            </form>
            <p className="register__footer">
                Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="register__login-link">Войти</Link>
            </p>
        </div>
    )
}

export default Register;