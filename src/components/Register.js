import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

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
            <AuthForm
                submitButton="Зарегистрироваться"
                email={email}
                header="Регистрация"
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
                password={password}
            />

            <p className="register__footer">
                Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="register__footer-link">Войти</Link>
            </p>
        </div>
    )
}

export default Register;