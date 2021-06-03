import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, BrowserRouter } from 'react-router-dom';

import '../index.css';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([info, card]) => {
        setCurrentUser(info);
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

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


  function handleDeleteClick(card) {
    setSelectedCard(card)
    setDeletePopupOpen(true);
  }

  // открытие попапа картинки
  function handleCardClick(card) {
    setSelectedCard(card);
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


  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeletePopupOpen(false);
    setMessagePopupOpen(false);
    setSelectedCard();
  }

  //обновление данных пользователя
  function handleUpdateUser(currentUser) {
    setLoading(true)
    api.setUserInfo(currentUser)
      .then((results) => {
        setCurrentUser(results);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }

  // обновление аватара
  function handleUpdateAvatar(avatar) {
    setLoading(true)
    api.updateAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }

  // добавление новой карточки через форму
  function handleAddPlaceSubmit(currentUser) {
    setLoading(true)
    api.createCard(currentUser)
      .then((results) => {
        setCards([results, ...cards]);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }

  //регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          history.push('/sign-in');
          setMessagePopupOpen(true);
          setIsSuccessful(true);
          setMessage('Вы успешно зарегистрировались!');
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setMessagePopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('некорректно заполнено одно из полей');
        }
      })
  }


  //авторизация
  function handleLogin(email, password) {

    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email)
          setLoggedIn(true);
          localStorage.setItem('token', data.token)
          history.push('/')
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setMessagePopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('не передано одно из полей');
        }
        if (err === 401) {
          return console.log('пользователь с email не найден');
        }
      })
  }


  function tokenCheck() {

    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setEmail(data.data.email)
          setLoggedIn(true)
          history.push('/')
        })
        .catch((err) => {
          if (err === 401) {
            return console.log('Токен не передан или передан не в том формате');
          }
        })
    }
  }

  // Выход из системы
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  useEffect(() => {
    tokenCheck();
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">
        <Header
          email={email}
          onClick={handleSignOut}
          loggedIn={loggedIn}
        />
        <BrowserRouter>
          <Switch>

            <ProtectedRoute exact path='/' loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLoggin={handleLogin}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onClick={isLoading}
      />

      <AddPlacePopup
        onClick={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onClick={isLoading}
      />

      <ConfirmPopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onDelete={handleCardDelete}
        card={selectedCard}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isMessagePopupOpen}
        isSuccess={isSuccessful}
        message={message}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>

  );
}

export default App;
