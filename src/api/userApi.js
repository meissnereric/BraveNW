// api for User model controller and routes

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:42069/api'
})

export const createUser = (payload) => api.post(`/user/`, payload) // ControllerBase.createDocument
export const getUserByEmail = (email) => api.get(`/user/${email}`) // UserController.getUserByEmail
// export const updateUserById = (id) => api.put(`/user/${id}`, payload) //UserController.updateDocument
export const getAllUsers = () => api.get(`/users`) // ControllerBase.getDocuments
export const deleteUserById = id => api.delete(`/user/${id}`) // ControlerBase.deleteDocument

const userApis = {
    createUser,
    getUserByEmail,
    // updateUserById,
    getAllUsers
}

export default userApis