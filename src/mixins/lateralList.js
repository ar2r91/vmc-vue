import locations from "../services/resources/locations";

export default {
  data() {
    return {
      page: 1,
      search: '',
      documents: []
    }
  },
  methods: {
    infiniteHandler($state) {
      this.loadDocuments(this.page, $state);
    },
    searchDebounce: _.debounce((vm) => {
      vm.loadDocuments();
    }, 350),
    loadDocuments(page = 1, $state) {
      if(page === 1) {
        this.page = 1;
        this.documents = [];
      }

      this.$parent.getListPaginate(this.page, this.search).then(({data}) => {
        if($state !== undefined) {
          if (data.data.length) {
            this.documents.push(...data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        } else {
          this.documents = data.data;
        }
        this.page += 1;
      });
    },
  }
}
