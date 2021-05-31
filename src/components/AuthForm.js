function AuthForm({
    submitButton,
    email,
    header,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    password,
}) {
    return (
        <form onSubmit={handleSubmit} className="form form_type_auth">
            <h2 className="form__header form__header_type_auth">{header}</h2>
            <input
                autoComplete="off"
                className="form__input form__input_type_auth"
                id="email"
                name="email"
                onChange={handleEmailChange}
                placeholder="Email"
                required
                type="email"
                value={email}
            />
            <input
                autoComplete="off"
                className="form__input form__input_type_auth"
                id="password"
                name="password"
                onChange={handlePasswordChange}
                placeholder="Пароль"
                required
                type="password"
                value={password}
            />
            <button
                type="submit"
                className="form__submit-btn form__submit-btn_type_auth"
            >
                {submitButton}
            </button>
        </form>
    );
}

export default AuthForm;