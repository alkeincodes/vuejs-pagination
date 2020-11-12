import Pagination from './components/Pagination'

const Paginate = {
	/* eslint-disable-next-line */
  install (Vue, options = {}) {
    Vue.use(Pagination)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Paginate)
}

export default Pagination