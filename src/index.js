import Pagination from './components/Pagination'

const Paginate = {
  install (Vue = {}) {
    Vue.component('pagination', Pagination)
  }
}

export default Paginate