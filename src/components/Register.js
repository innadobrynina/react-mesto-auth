import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import Header from './Header';

function Register({ handleRegister, isLoading }) {

    return (
        <>
            <Header linkText='Войти' redirectPath='/sign-in' />
            <div className="auth">
                <h1 className="auth__header">Регистрация</h1>
                <AuthForm
                    handleAuth={handleRegister}
                    isLoading={isLoading}
                    buttonText='Зарегистрироваться'
                />
                <div className="auth__signin">
                    <p className="auth__signin-caption">
                        Уже зарегистрированы?&nbsp;</p>
                    <Link to="/sign-in" className="auth__login-link">Войти</Link>

                </div>
            </div>
        </>
    );
};

export default Register;