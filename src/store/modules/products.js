import products from '/assets/data/products.json';

const productsModule = {
  namespaced: true,
  state: {
    all: [],
  },
  getters: {

  },
  actions: {
    getAll({ commit }) {
      commit('setProducts', products)
    }
  },
  mutations: {
    set(state, products) {
      state.all = products
    },
  },
};

export default productsModule;
