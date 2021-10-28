import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:42069/api'
})

export const getAllTestModels = () => api.get('/test')

const apis = {
    getAllTestModels
}

export default apis