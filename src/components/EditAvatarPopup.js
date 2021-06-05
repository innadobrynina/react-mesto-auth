import React from 'react';
import Popup from './Popup';
import SubmitButton from './SubmitButton';



function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onClick }) {
    const avatarRef = React.useRef('');
    const [isValid, setIsValid] = React.useState(false);
    const [validationMessage, setValidationMessage] = React.useState('');
    const [isFormValid, setFormValid] = React.useState(false);

    function handleChange(evt) {
        if (!evt.target.validity.valid) {
            setIsValid(true)
            setValidationMessage(evt.target.validationMessage)
            setFormValid();
        } else {
            setIsValid(false)
            setValidationMessage('')
            setFormValid(true);
        }
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            link: avatarRef.current.value,
        });
    }


    React.useEffect(() => {
        avatarRef.current.value = '';
        setValidationMessage('');
        setFormValid();
    }, [isOpen])



    return (
        <Popup
            classname="popup__container"
            isOpen={isOpen}
            onClose={onClose}
            name='update-avatar'
            buttonText='Обновить'
        >
            <h3 className="popup__title">Обновить аватар</h3>
            <form
                onSubmit={handleSubmit}
                className="popup__form"
                action="#"
                method="POST"
                noValidate
            >

                <label className="popup__field">
                    <input
                        id="avatar-link"
                        type="url"
                        name="avatar"
                        className="popup__input"
                        placeholder="Ссылка на аватар"
                        required
                        aria-label="Ссылка на аватар"
                        ref={avatarRef}
                        onChange={handleChange}
                    />
                    <span className={isValid ? " popup__input-error_avatar" : ""} id="avatar-link-error">{validationMessage}</span>
                </label>
                <SubmitButton
                    classname="popup"
                    isDisabled={!isFormValid}
                    button="Сохранить"
                    onClick={onClick}
                >
                </SubmitButton>
            </form>
        </Popup>
    );
}

export default EditAvatarPopup;