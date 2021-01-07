import router from "../../router";
import api from '@/services/api';

const defaultUser = {
  first_name: '',
  is_applicant: true,
  is_super_admin: false
};

const defaultState = () => {
  return {
    user: JSON.parse(localStorage.getItem('user')) || defaultUser,
    token: localStorage.getItem('token') || '',
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
    position: JSON.parse(localStorage.getItem('position')) || [],
  };
};

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    permissions: state => state.permissions,
    isSuperAdmin: state => state.user.is_super_admin, //Si funciona aun, pero checkear la bd
    isApplicant: state => state.user.is_applicant == 1 ? true : false,
    isApplicant_contractor: state => state.user.is_applicant == 1 && state.user.company_id !== null? true : false,
    isWaitingApproval: state => state.user.email_sent == 1 && !state.permissions.includes("edit applicant") ? true : false,
    userCan: (state, getters) => permission => {
      if (getters.isSuperAdmin) {
        return true;
      }
      return state.permissions.includes(permission);
    }
  },
  actions: {
    login({commit, dispatch}, data) {
      return api.post('login', data).then((r) => {
        commit('setToken', r.data.token);
        commit('setUser', r.data.user);
        commit('setPermissions', r.data.permissions);
        router.push('/monitor-dashboard');
      });
    },
    loginCollaborator({commit, dispatch}, data) {
      return api.post('user/login', data).then((r) => {
        console.log(r.data);
        commit('setToken', r.data.token);
        commit('setUser', r.data.user);
        commit('setPermissions', r.data.permissions);
        commit('SET_POSITION', r.data.position);

        if (r.data.user.is_applicant === 1) {
          router.push('/applicant/profile');
        } else if (r.data.user.is_applicant === 0) {
          router.push('/collaborator/profile');
        }
      });
    },
    registerCollaborator({commit, dispatch}, data) {
      return api.post('user/register', data).then((r) => {
        router.push('/login');
      });
    },
    logout({commit}) {
      api.post('logout', null, {
        headers: {
          Authorization: "Bearer " + this.getters['user/getToken']
        }
      }).then(response => {
        commit('resetState');
        router.push('/login');
      });
    },
    resetState({commit}) {
      commit('resetState');
    },
  },
  mutations: {
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    setPermissions(state, permissions) {
      localStorage.setItem('permissions', JSON.stringify(permissions));
      state.permissions = permissions;
    },
    resetState(state) {
      localStorage.removeItem('token');
      Object.assign(state, defaultState())
    },
    SET_POSITION(state, position){
      localStorage.setItem('position', JSON.stringify(position));
      state.position = position;
    },
  }
}
