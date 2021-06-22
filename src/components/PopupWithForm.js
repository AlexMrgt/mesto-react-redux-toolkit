import closeImage from '../images/popup/close-icon.svg';

function PopupWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isDisabled,
}) {

  return (

    <div
      className={`popup ${isOpen && 'popup_active'}`}
    >

      <div className="popup__wrapper">

        <form
          className='popup__form popup__form_scope'
          noValidate
          onSubmit = {onSubmit}
          >

          <button
            type="button"
            className="popup__close-popup"
            onClick = {onClose}
          >
            <img
              className="popup__close-popup-image"
              src={closeImage}
              alt="Кнопка 'Закрыть всплывающее окно'"
            />
          </button>

          <h2
            className="popup__header">
            {title}
          </h2>

          {children}

          <button
            type="submit"
            className='popup__save-button'
            disabled = {isDisabled}
          >
            {buttonText}
          </button>

        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
