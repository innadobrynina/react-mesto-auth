import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from 'react-router-dom';

import '../index.css';
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
  const history = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccessAuth, setSuccessAuth] = useState(false);

  const [userData, setUserData] = useState({
    email: '',
    _id: ''
  });




  // проверяем токе, получаем данные профиля и получаем карточки
  useEffect(() => {
    tokenCheck()

    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err =>
        console.log(`Ошибка: ${err}`));

    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err =>
        console.log(`Ошибка: ${err}`));
  }, [history]);

  // ОБработчик ошибки
  const handleError = () => {
    setSuccessAuth(false);
    handleInfoTooltipOpen(true);
  };



  //регистрация
  const handleRegister = ({ email, password }) => {
    setLoading(true)
    return auth.register(password, email)
      .then(data => {
        const { email, _id } = data.data;
        setUserData({ email, _id });
        setSuccessAuth(true)
        handleInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  //авторизация
  const handleLogin = ({ email, password }) => {
    setLoading(true)
    auth.authorize(password, email)
      .then(data => {
        const { token } = data;
        localStorage.setItem('jwt', token);
        setUserData({ ...userData, email });
        setLoggedIn(true);
        history.push('/');
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  // Выход из системы
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({
      email: '',
      _id: ''
    });
  };

  //проверка токена
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(data => {
          const { email, _id } = data.data;
          setUserData({ email, _id });
          setLoggedIn(true);
          history.push('/');
        })
        .catch(err => console.log(err))
    };
  };



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
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({})
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
  // Открытии и закрытие меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  };

  const handleInfoTooltipOpen = () => {
    setInfoTooltip(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">

        <BrowserRouter >
          <Switch>
            <ProtectedRoute
              exact
              path='/'
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
              handleSignOut={handleSignOut}
              userData={userData}
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuButtonClick}
            />

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} isLoading={isLoading} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} isLoading={isLoading} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
            </Route>


          </Switch>
        </BrowserRouter>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <PopupWithForm
          title='Вы уверены?'
          name='popup-confirm'
          buttonText='Сохранить'>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isSuccessAuth={isSuccessAuth}

        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
