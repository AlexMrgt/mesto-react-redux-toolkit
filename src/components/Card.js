import { useSelector } from "react-redux";
import { getAuthData } from "../store/auth/selectors";

function Card({
  card,
  onDelete,
  onLike,
  onCardSelect,
}
) {

  const {id: userId} = useSelector(getAuthData);

  const isOwner = card.owner._id === userId;
  const isLiked = card.likes.some((user)=>user._id === userId);

  function handleDeleteCardClick(){
    onDelete(card);
  }

  function handleLikeClick(){

    onLike(card._id, isLiked);
  }

  function handleCardClick(){
    onCardSelect(card);
  }

  return (
    <article className='card'>
      <button
        type='button'
        onClick = {handleDeleteCardClick}
        className={`
          card__delete-card
          ${isOwner && 'card__delete-card_active'}
        `}

      />

      <img
        src={card.link}
        alt='Фотография'
        className='card__picture'
        onClick = {handleCardClick}

      />
      <h2 className='card__title'>{card.name}</h2>
      <div className='card__like-container'>
        <button
          type='button'
          className={`card__like ${isLiked && 'card__like_active'} `}
          onClick = {handleLikeClick}
        >
        </button>
        <p className='card__like-counter'>{card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;
