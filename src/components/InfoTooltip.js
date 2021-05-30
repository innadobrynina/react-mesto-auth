import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoToolTip(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <button type="button" className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
                <img className="popup__icon" src={props.auth ? successIcon : failIcon} alt={props.auth}></img>
                <p className="popup__text">{props.auth ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div>
    )
}

export default InfoToolTip;