const cartModule = {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(({ id, quantity }) => {
        const product = rootState.products.all.find(product => product.id === id);
        return {
          title: product.title,
          price: product.price,
          quantity,
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartProducts.reduce((total, product) => (total + product.price * product.quantity), 0);
    },
  },
  actions: {
    checkout({ commit, state }, products) {
      const savedCartItems = [...state.items];
      commit('setCartItems', { items: [] });
    },

    addProductToCart({ state, commit }, product) {
      if (product.inventory > 0) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit('pushProductToCart', { id: product.id });
        } else {
          commit('incrementItemQuantity', cartItem);
        }
      }
    },
  },
  mutations: {
    pushProductToCart(state, { id }) {
      state.items.push({
        id,
        quantity: 1,
      });
    },

    incrementItemQuantity(state, { id }) {
      const cartItem = state.items.find(item => item.id === id);
      cartItem.quantity += 1;
    },

    setCartItems(state, { items }) {
      state.items = items;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
  },
};

export default cartModule;
