import { API_BASE } from '../utils/constants'
import AxiosInterceptor from '../utils/AxiosInterceptor'

const API_URL = API_BASE + '/posts'
const apiPost = {
    add: (value) => AxiosInterceptor().post(API_URL, value),
    getAll: (value) => AxiosInterceptor().get(API_URL),
    like: (value) =>
        AxiosInterceptor().post(API_URL + `/${value?.postId}/like`, value),
}

export default apiPost