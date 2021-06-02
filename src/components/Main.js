import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';


function Main({
    cards,
    onCardLike,
    onCardDelete,
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    loggedIn,
    handleSignOut,
    userData,
    isMenuOpen,
    onMenuClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header
                loggedIn={loggedIn}
                userData={userData}
                handleSignout={handleSignOut}
                isOpen={isMenuOpen}
                handleMenuClick={onMenuClick}
            />
            <main>
                <div className="content">
                    <section className="profile">
                        <div className="profile__avatar-block">
                            <div className="profile__avatar" alt="аватар" style={{ backgroundImage: `url(${currentUser?.avatar})` }} />
                            <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__text">
                                <h1 className="profile__title">{currentUser?.name}</h1>
                                <button onClick={onEditProfile} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                            </div>
                            <p className="profile__subtitle">{currentUser?.about}</p>

                        </div>

                        <button onClick={onAddPlace} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                    </section>
                    <section className="elements">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                link={card.link}
                                name={card.name}
                                likes={card.likes.length}
                                card={card}
                                onCardClick={onCardClick}
                                onCardDelete={onCardDelete}
                                onCardLike={onCardLike}
                            />)
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

export default Main;