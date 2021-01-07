import router from "../../router";
import api from '@/services/api';



export default {
  namespaced: true,
  state: {
    students: [],
    search: '',
    currentPage: 1,
    perPage: 10,
    totalItems: 0
  },
  getters: {

  },
  actions: {
    async getStudents(context) {
      try {
        const res = await api.get("/activities?name=" +context.state.search+ "&page="+ context.state.currentPage+ "&per_page="+context.state.perPage)
        context.commit('StudentsList', res.data.data)
        context.commit('SetTotalItems', res.data.total)
        console.log(res.data.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },


  },
  mutations: {
    StudentsList(state, students) {
      state.students = students
    },

    SetCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    SetPerPage(state, perPage) {
      state.perPage = perPage
    },
    SetTotalItems(state, totalItems) {
      state.totalItems = totalItems
    },
    SetSearch(state, search) {
      state.search = search
    },

  }
}
