import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import api from '../utils/api';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState({
    status: false,
    title: '',
  });

  let state = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(state);

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setEmail(res.email)
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setRequestStatus({
          status: true,
          title: '???? ?????????????? ????????????????????????????????????!',
        });
        history.push('/signin');
      }
    })
    .catch((err) => {
      setRequestStatus({
        status: false,
        title: '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.',
      });
      console.log(err);
    })
    .finally(() => {
      setInfoTooltipPopupOpen(true);
    })
  }

function handleLogin({ email, password }) {
  auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setEmail(email);
      setLoggedIn(true);
      history.push('/');
    })
    .catch((err) => {
      setRequestStatus({
        status: false,
        title: '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.',
      });
      setInfoTooltipPopupOpen(true);
      console.log(err);
    })
}

function handleSignOut() {
  localStorage.removeItem('token');
  setLoggedIn(false);
}

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  // ??????????????-???????????????????? ?????? ???????????????? ???????? ??????????????
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

    //???????????????? ???????????? ????????????????????????
  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

    //???????????????? ????????????
  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

    //???????????????? ?????????? ????????????????
  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        }).catch((err) => {
          console.error(err);
      });
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) =>
                    cards.filter((c) =>
                        c._id !== card._id
                    )
                )
                closeAllPopups();
            })
            .catch((err) => {
               console.error(err);
            });
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header 
          email={email}
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <Switch>
          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            component = {Main}
            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/signin'>
            <Login onLogin={handleLogin} />
          </Route> 
          <Route path='*'>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen} 
          onClose={closeAllPopups} 
          signupState={requestStatus.status}
          statusText={requestStatus.title}
        />
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
        <PopupWithForm
          name="confirm"
          title="???? ???????????????"
          formName="form-confirm"
          submitText="????"
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          name="image"
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;