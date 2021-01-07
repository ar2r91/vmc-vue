import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import activity_log from './modules/activity_log';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {user: user, activity_log},
  strict: debug,
  state: {
    loadingCount: false,
    loadingTable: false
  },
  mutations: {
    loading(state) {
      state.loadingCount = true;
      //console.log('Loading Add', state.loadingCount);
    },
    endLoading(state) {
      state.loadingCount = false;
      //console.log('Loading Remove', state.loadingCount);
    },
    SET_LOADING(state, context){
      state.loadingTable = context;
    }
  },
})
