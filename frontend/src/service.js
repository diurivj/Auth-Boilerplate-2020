import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://google.com'

const service = axios.create({
  baseURL,
  withCredentials: true,
})

const AUTH_SERVICE = {
  SIGNUP: async data => await service.post('/signup', data),
  LOGIN: async data => await service.post('/login', data),
  FACEBOOKLOGIN: async () => await service.get('/facebook'),
  CURRENT_USER: async () => await service.get('/currentUser'),
  LOGOUT: async () => await service.get('/logout'),
}

export default AUTH_SERVICE
