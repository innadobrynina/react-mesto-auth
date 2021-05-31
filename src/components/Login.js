import React, { useState } from 'react';
import AuthForm from './AuthForm';


function Login({ onLogin }) {
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
        onLogin(password, email);
    }

    return (
        <div className="login">
            <AuthForm
                submitButton="Войти"
                email={email}
                header="Вход"
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
                password={password}
            />
        </div>
    )
}

export default Login;