import PopupWithForm from "../components/PopupWithForm";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendUserTextInfo } from "../store/current-user/slice";
import useFormWithValidation from "../customHooks/useFormWithValidation";
import { getIsTextInfoSending, getUserData } from "../store/current-user/selectors";

function EditProfilePopup({
  isOpen,
  onClose,
}) {

  const { values, errors, handleChange, isValid, resetForm, } = useFormWithValidation();

  const dispatch = useDispatch();

  const currentUser = useSelector(getUserData);
  const isSending = useSelector(getIsTextInfoSending);

  useEffect(() => {

    if (currentUser) {
      resetForm({
        name: currentUser.name,
        about: currentUser.about
      },
        {},
        false)
    }
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {

    evt.preventDefault();

    dispatch(sendUserTextInfo(values))
      .then(() => {
        onClose();
      })

  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      scope='edit'
      title='Редактировать профиль'
      isDisabled={!isValid || isSending}
      buttonText={
        isSending
          ? 'Сохраняем...'
          : 'Сохранить'
      }
    >
      <Input
        id='name-input'
        name='name'
        inputClassName='popup__field'
        type='text'
        minLength='2'
        maxLength='40'
        value={values.name}
        error={errors.name}
        onChange={handleChange}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
      <Input
        id='description-input'
        name='about'
        inputClassName='popup__field'
        type='text'
        minLength='2'
        maxLength='200'
        value={values.about}
        error={errors.about}
        onChange={handleChange}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
