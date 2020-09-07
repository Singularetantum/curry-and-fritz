import { Module } from 'vuex';

const orderListModule = {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    getTotalPrice(state) {
      return state.items.filter.reduce((a, b) => a.price + b.price);
    }
  },
  actions: {},
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    addItem(state, item) {
      state.items.push(item);
    },
    removeItem(state, itemToRemove) {
      state.items.filter(item => item !== itemToRemove);
    },
    reset(state) {
      state.items = [];
    },
  }
};

export default orderListModule;
