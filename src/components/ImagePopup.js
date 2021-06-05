import React from "react";
import Popup from './Popup';

function ImagePopup({ onClose, isOpen, card }) {
    return (
        <Popup
            name="popup-image"
            className="popup-image__container"
            onClose={onClose}
            isOpen={isOpen}
        >
            <img
                src={card ? card.link : ""}
                alt={card ? card.name : ""}
                className="popup-image__content"
                id="img01"
            />
            <figcaption
                className="popup-image__caption">{card ? card.name : ''}
            </figcaption>
        </Popup >
    );
}

export default ImagePopup;