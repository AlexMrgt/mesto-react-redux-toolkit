import axios from "axios";
import { BASE_BACKEND_URL } from "./constants";

class AuthApi {

  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      responseType: 'json',
      withCredentials: true,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  checkIsAuthorized(){
    return this.client.get('/authCheck')

  }

  signup(data){
    return this.client.post('/signup', data)

  }

  signin(data){
    return this.client.post('/signin', data);
  }

  signout(){
    return this.client.delete('/logout');
  }
}

const authApi = new AuthApi( BASE_BACKEND_URL);

export default authApi;
