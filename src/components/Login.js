import React from 'react';
import Header from './Header';
import AuthForm from './AuthForm';


function Login({ handleLogin, isLoading }) {

    return (
        <>
            <Header linkText='Регистрация' redirectPath='/sign-up' />
            <div className="auth">
                <h1 className="auth__header">Вход</h1>
                <AuthForm handleAuth={handleLogin} isLoading={isLoading} buttonText='Войти' />
            </div>
        </>
    );
};

export default Login;