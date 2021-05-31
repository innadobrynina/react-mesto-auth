import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  let history = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ link: '', name: '', isOpen: false });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState("");
  const [isSuccessAuth, setIsSuccessAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);


  //проверка токена
  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      if (token) {
        auth.getContent(token)
          .then(({ data }) => {
            setEmail(data.email);
            setLoggedIn(true);
            history.push("/");
          })
          .catch((err) => console.log(err));
      }
    }
  }, [history]);


  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);


  //регистрация
  function handleRegister(password, email) {

    auth.register(password, email)
      .then(() => {
        setIsInfoPopupOpen(true);
        setIsSuccessAuth(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        setIsSuccessAuth(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  //авторизация
  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem("token", data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        setIsSuccessAuth(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  // Выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }



  // открытие попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // открытие попапа изменения данных пользователя
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // открытие попапа добавления картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }



  // открытие попапа картинки
  function handleCardClick(name, link) {
    setSelectedCard({
      name: name,
      link: link,
      isOpen: true
    });
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ link: '', name: '', isOpen: false })
  }

  useEffect(() => {
    api.getUserInfo()
      .then((results) => {
        setCurrentUser({
          _id: results._id,
          name: results.name,
          about: results.about,
          avatar: results.avatar
        })
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }, [])

  useEffect(() => {
    api.getCards()
      .then((results) => {
        setCards(results)
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }, [])


  //удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        // Определяем, являемся ли мы владельцем текущей карточки
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  //лайк карточки
  function handleCardLike(card) {
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  //обновление данных пользователя
  function handleUpdateUser(currentUser) {
    api.setUserInfo(currentUser)
      .then((results) => {
        setCurrentUser(results);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  // обновление аватара
  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }

  // добавление новой карточки через форму
  function handleAddPlaceSubmit(currentUser) {
    api.createCard(currentUser)
      .then((results) => {
        setCards([results, ...cards]);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`));
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">
        <Header email={email} loggedIn={loggedIn} signOut={handleSignOut} />
        <BrowserRouter>
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={loggedIn}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              selectedCard={selectedCard}
              onClose={closeAllPopups}
            />

          </Switch>
        </BrowserRouter>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup

          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title='Вы уверены?'
          name='popup-confirm'
          buttonText='Сохранить'>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.isOpen}
          onClose={() => closeAllPopups()}
        />

        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          auth={isSuccessAuth}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
