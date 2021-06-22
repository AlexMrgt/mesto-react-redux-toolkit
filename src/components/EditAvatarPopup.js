
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "../components/PopupWithForm";
import useFormWithValidation from "../customHooks/useFormWithValidation";
import { getIsAvatarSending } from "../store/current-user/selectors";
import { sendAvatar } from "../store/current-user/slice";
import Input from "./Input";

function EditAvatarPopup({
  isOpen,
  onClose
}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation()

  const dispatch = useDispatch();

  const isSending = useSelector(getIsAvatarSending);


  function handleSubmit(evt) {

    evt.preventDefault();

    dispatch(sendAvatar(values))
      .then(() => {
        onClose();
      })
  }

  useEffect(()=>{
    resetForm();
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      scope='edit-avatar'
      title='Обновить аватар'
      buttonText={isSending
        ? 'Сохраняем...'
        : 'Сохранить'
      }
      isDisabled={!isValid || isSending}
    >
      <Input
        id='avatar-url-input'
        name='avatar'
        inputClassName='popup__field'
        type='url'
        placeholder='Ссылка на фото'
        value={values.avatar}
        error={errors.avatar}
        onChange={handleChange}
        labelClassName='popup__form-label'
        spanClassNameClarification='popup'
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
