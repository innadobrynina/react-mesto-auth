import React, { useState } from 'react';


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
            <h2 className="login__header">Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input className="login__form-input"
                    id="email"
                    required
                    name="email"
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="Email"
                    value={email}
                />
                <input className="login__form-input"
                    id="password"
                    required
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={handlePasswordChange}
                    value={password}
                />

                <button type="submit" className="login__form-submit-btn">Войти</button>
            </form>
        </div>
    )
}

export default Login;