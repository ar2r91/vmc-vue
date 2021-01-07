import axios from 'axios';
import store from "../store";
import router from "../router";

const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(function (config) { //Intercepta las solicitudes
  config.headers.Authorization =  'Bearer ' + store.getters['user/getToken'];

  //console.log(config);

  if(!config.noloading) {
    store.commit('loading');
  }

  return config;
}, (error) => {

  store.commit('endLoading');
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => { //Intercepta las respuestas
  store.commit('endLoading');
  return response;
}, function (error) {
  let json = error.response.data;
  let message = json.message;

  store.commit('endLoading');

  //If error 401 redirect to login
  if(error.response.status === 401) {
    router.push('/login');
  } else if(error.response.status === 404) {
    message = 'El recurso no existe';
  }

  if(json.errors !== undefined) {
    let errors = [];
    //console.log(json.errors);
    _.forEach(json.errors, (err, index) => {
      errors.push(err[0]);
    });

    Toast.fire('Error', errors.join('<br>'), 'error');
  } else {
    Toast.fire('Error', message, 'error');
  }

  return Promise.reject(error.response);
});

export default axiosInstance;
