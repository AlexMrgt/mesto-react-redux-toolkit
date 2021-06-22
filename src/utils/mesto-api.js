import axios from 'axios';
import { BASE_BACKEND_URL } from './constants';

class MestoApi {

  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      responseType: 'json',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  };

  // user api
  getUserData() {
    return this.client.get('/users/me');
  }

  updateTextInfo(data) {
    return this.client.patch('/users/me', data)
  }

  updateAvatar(data) {
    return this.client.patch('/users/me/avatar', data)
  }


  // cards api
  getCardList() {
    return this.client.get('/cards')
  }

  addCard(data) {
    return this.client.post('/cards', data);
  }

  deleteCard(cardId) {
    return this.client.delete(`/cards/${cardId}`)
  }

  setLike(cardId) {
    return this.client.put(`/cards/${cardId}/likes`)
  }

  deleteLike(cardId) {
    return this.client.delete(`/cards/${cardId}/likes`)
  }

  changeLikeStatus(cardId, isLiked) {

    if (isLiked)
      return this.deleteLike(cardId)

    return this.setLike(cardId)

  }

}

const mestoApi = new MestoApi(BASE_BACKEND_URL);

export default mestoApi;
