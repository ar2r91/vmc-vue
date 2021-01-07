// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import api from './services/api'
import './registerServiceWorker'

import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsCylinder from "highcharts/modules/cylinder";
import HighchartsFunnel3d from "highcharts/modules/funnel3d";
import HighchartsPyramid from "highcharts/modules/pyramid3d";
import HighchartsVue from "highcharts-vue";

Highcharts3d(Highcharts);
HighchartsCylinder(Highcharts);
HighchartsFunnel3d(Highcharts);
HighchartsPyramid(Highcharts);

// import Echo from "laravel-echo"

// window.Pusher = require('pusher-js');

import VueSocketio from "vue-socket.io";

Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:3000'
}));

Vue.use(HighchartsVue);

require('./defaultComponents');

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

window.Swal = require('sweetalert2');
window.moment = require('moment');

const Toast = window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000
});

window.$ = window.jQuery = require('jquery');

window.api = api;
window._ = require('lodash');

require('./helpers');
require('bootstrap');

/*window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '080e9ad6fb14157765dc',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    forceTLS: false,
    cluster: 'mt1',
    disableStats: true,
    enabledTransports: ['ws']
});*/

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    store,
    components: {
        App
    },
});
