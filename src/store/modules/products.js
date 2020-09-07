import productsData from '../../assets/data/products.json';

const productsModule = {
  namespaced: true,
  state: {
    all: productsData,
  },
  getters: {

  },
  actions: {
  },
  mutations: {
    set(state, products) {
      state.all = products;
    },
  },
};

export default productsModule;
