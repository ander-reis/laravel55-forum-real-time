
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css/dist/js/materialize.js');

    require('./parallax-header');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '73e7d027ef003c33d968',
    cluster: 'us2',
    forceTLS: true
});

import swal from 'sweetalert2'

const successCallback = (response) => {
    return response;
}

const errorCallback = (error) => {
    if(error.response.status === 401) {
        swal({
            title: 'Autenticação',
            text: 'Para acessar este recurso você precisa estar autenticado!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok!',
            cancelButtonText: 'Não'
        }).then((result) => {
            if(result.value){
                window.location = '/login';
            }
        });
    } else {
        swal({
            title: 'Error',
            text: 'Algo deu Errado',
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
        });
    }
    return Promise.reject(error);
}

window.axios.interceptors.response.use(successCallback, errorCallback);

window.Vue = require('vue');

// import Vue from 'vue'

Vue.component('loader', require('./commons/AxiosLoader').default);
const commonApps = new Vue({
    el: '#loader'
});