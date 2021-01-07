import Vue from 'vue'
import DatePicker from 'vue2-datepicker'
import vSelect from 'vue-select'
import VuePaginate from 'vue-paginate'

Vue.component('date-picker', DatePicker);
Vue.component('v-select', vSelect);
Vue.use(VuePaginate);
