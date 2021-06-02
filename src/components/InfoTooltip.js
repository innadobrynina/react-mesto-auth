import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip({ onClose, isOpen, isSuccess }) {
    const image = isSuccess ? successIcon : failIcon;
    const caption = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e => e.stopPropagation()}>

                <div className="info">
                    <img className="info__image" src={image} alt={caption} />
                    <p className="info__caption">{caption}</p>
                    <button type="reset"
                        className="popup__close-button"
                        onClick={onClose}>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoTooltip;