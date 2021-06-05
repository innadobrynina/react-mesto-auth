import React from 'react';
import Popup from './Popup';
import SubmitButton from './SubmitButton.js';

function AddPlacePopup({ onClick, onAddPlace, isOpen, onClose }) {

  const [inputValue, setInputValue] = React.useState({ name: '', link: '', });
  const [isValid, setIsValid] = React.useState({ name: false, link: false });
  const [validationMessage, setValidationMessage] = React.useState({ name: '', link: '' });
  const isFormValid = Object.values(isValid).every(Boolean);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setIsValid({
      ...isValid,
      [name]: event.target.validity.valid,
    })
    setValidationMessage({
      ...validationMessage,
      [name]: event.target.validationMessage,
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: inputValue.name,
      link: inputValue.link,
    });
  }

  React.useEffect(() => {
    setInputValue({ name: '', link: '' });
    setValidationMessage({ name: '', link: '' });
    setIsValid({ name: false, link: false });
  }, [isOpen])

  return (
    <Popup
      classname="popup__container"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className="popup__title">Новое место</h3>
      <form
        onSubmit={handleSubmit}
        className="popup__form"
        action="#"
        method="POST"
        noValidate
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_place"
            type="text"
            name="name"
            id="place-name"
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
            value={inputValue.name}
            onChange={handleInputChange}

          />
          <span className="popup__input-error popup__input-error_place" id="place-name-error"></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_image"
            type="url"
            name="link"
            id="link-image"
            placeholder="Ссылка на картинку"
            required
            value={inputValue.link}
            onChange={handleInputChange}

          />
          <span className="popup__input-error popup__input-error_image" id="link-image-error">
            {validationMessage.link}
          </span>
        </label>
        <SubmitButton
          classname="popup"
          isDisabled={!isFormValid}
          button="Создать"
          onClick={onClick}
        >
        </SubmitButton>
      </form>
    </Popup>
  )

}

export default AddPlacePopup;