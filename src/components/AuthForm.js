import { useState } from 'react';

function AuthForm({ handleAuth, isLoading, buttonText }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    //изменение инпута
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData({
            ...data,
            [name]: value
        });
    };

    // сабмит формы
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = data;
        handleAuth({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="form form_type_auth" method="POST" name="login">

            <input
                value={data.email}
                onChange={handleChange}
                autoComplete="off"
                className="form__input form__input_type_auth"
                id="email"
                name="email"
                placeholder="Email"
                required
                type="email"
            />
            <input
                autoComplete="off"
                className="form__input form__input_type_auth"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Пароль"
                required
                type="password"
                value={data.password}
                minLength="2"
                maxLength="200"
            />
            <button
                type="submit"
                className="form__submit-btn form__submit-btn_type_auth"
            >
                {isLoading ? 'Загрузка...' : buttonText}
            </button>
        </form>
    );
}

export default AuthForm;