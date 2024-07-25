import axios from 'axios'
import { API_BASE } from '../utils/constants'
import AxiosInterceptor from '../utils/AxiosInterceptor'

const API_URL = API_BASE + '/auth/'
const apiAuth = {
    register: (value) => axios.post(API_URL + 'register', value),

    login: (value) => axios.post(API_URL + 'login', value),
    // getProfile: () => AxiosInterceptor().get(API_URL + 'get-profile'),
    // getProfileById: (value) =>
    //     AxiosInterceptor().post(API_URL + 'profilebyid', value),
}

export default apiAuth
