import axios from "axios";

export const removeToken = function(){
    return localStorage.removeItem('token')
}

export const setToken = function(token){
    return localStorage.setItem('token', token)
}

export const getToken = function(){
    return localStorage.getItem('token')
}

export const getAPI = function(formType){
    const token = getToken()
    const Authorization = token ? `Bearer ${token}`:undefined

    let headers = {
        Authorization
    }
    if(formType == 'formData') {
        headers = {
            ...headers,
            "Content-Type": "multipart/form-data"
        }
    }
    const instance =  axios.create({
        baseURL: 'http://localhost:3002',
        headers: {
            Authorization
        }
    })

    instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if(error.response.status == 401) {
            removeToken();           
        }
        return Promise.reject(error);
      });

      return instance;

}