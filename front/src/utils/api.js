import axios from "axios"

export const removeToken = function(){
    return localStorage.removeItem('token')
}

export const setToken = function(token){
    return localStorage.setItem('token', token)
}

export const getToken = function(){
    return localStorage.getItem('token')
}

export const getAPI = function(){
    const token = getToken()
    const Authorization = token ? `Bearer ${token}`:undefined

    return axios.create({
        baseURL: 'http://localhost:3002',
        headers: {
            Authorization
        }
    })
}