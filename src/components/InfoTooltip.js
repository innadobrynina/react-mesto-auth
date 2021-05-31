import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip(props) {
    const className = props.isOpen ? `popup_fade-in` : `popup_fade-out`;
    return (
        <div className={`popup popup_${props.name} ${className}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button type="button"
                    className={`popup__close-button popup__close-button_${props.name}`}
                    onClick={props.onClose}>

                </button>
                <img
                    className="popup__icon"
                    src={props.isSuccessAuth ? successIcon : failIcon}
                    alt={props.isSuccessAuth
                        ? "иконка успешной регистрации"
                        : "иконка не успешной регистрации"}>

                </img>
                <p className="popup__text">{props.isSuccessAuth
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;