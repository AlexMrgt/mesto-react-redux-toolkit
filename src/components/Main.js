import addButtonImage from '../images/profile/add-button.svg';
import editAvatarIcon from '../images/profile/edit_icon.svg';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser } from '../store/current-user/slice';
import { getUserData } from '../store/current-user/selectors';
import { getCards, getIsInitialCardsLoading } from '../store/cards/selectors';
import { changeLikeCardStatus, deleteCard, loadCards } from '../store/cards/slice';
import Card from './Card';

function Main() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditTextInfoPopupOpen, setIsEditTextInfoPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardForDelete, setCardForDelete] = useState(null)

  const dispatch = useDispatch();

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditTextInfoPopupOpen(false);
    setIsAddCardPopupOpen(false);

    setSelectedCard(null);
    setCardForDelete(null);
  }

  const { name, about, avatar, } = useSelector(getUserData);

  const isInitLoading = useSelector(getIsInitialCardsLoading);

  const handleEditProfileClick = () => setIsEditTextInfoPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddCardPopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleCardSelect = (card) => setSelectedCard(card);

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
  }

  function handleDeleteCard(evt) {

    evt.preventDefault();

    dispatch(deleteCard(cardForDelete._id))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setCardForDelete(null);
      })
  }

  function handleLikeCard(id, isLiked) {

    dispatch(changeLikeCardStatus({ id, isLiked }))
      .catch((err) => {
        console.log(err)
      })
  }

  const cards = useSelector(getCards);

  useEffect(() => {

    dispatch(loadCurrentUser());
    dispatch(loadCards());
  }, [dispatch]);


  return (
    <main className='content' >

      <section className='profile' aria-label='Профиль' >

        <div
          className='profile__image-and-edit-button-container'
          onClick={handleEditAvatarClick}
        >
          <img
            src={avatar}
            alt='Фото профиля'
            className='profile__photo'
          />
          <img
            src={editAvatarIcon}
            alt='Кнопка Изменить аватар'
            className='profile__edit-profile-image'
          />
        </div>

        <div
          className='profile__name-and-edit-button-container'
        >
          <h1
            className='profile__name'
          >
            {name}
          </h1>

          <button
            onClick={handleEditProfileClick}
            type='button'
            className='profile__edit-profile'
          />

        </div>

        <p
          className='profile__description'
        >
          {about}
        </p>

        <button
          type='button'
          className='profile__add-card'
          onClick={handleAddPlaceClick}
        >
          <img
            className='profile__add-card-image'
            src={addButtonImage}
            alt='Кнопка Добавить карточку'
          />
        </button>
      </section>

      <section
        className='gallery'
        aria-label='Галерея'>

        {isInitLoading
          ? 'ЗАГРУЗ ОЧКА'
          : cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onDelete={handleCardDeleteRequest}
              onLike={handleLikeCard}
              onCardSelect = {handleCardSelect}
            />
          ))}


      </section>

      <EditProfilePopup
        isOpen={isEditTextInfoPopupOpen}
        onClose={closeAllPopups}

      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        isOpen={!!cardForDelete}
        onClose={closeAllPopups}
        title='Вы уверены?'
        buttonText='Удалить'
        onSubmit={handleDeleteCard}
      />

    </main>
  )
};

export default Main;
