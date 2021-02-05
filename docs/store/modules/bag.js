export const state = {
  icons: [],
};

export const getters = {
  GET_BAG_ICONS: (state) => state.icons,
  GET_BAG_SIZE: (state, getters) => getters.GET_BAG_ICONS.length,
  IS_BAG_VISIBLE: (state, getters) => getters.GET_BAG_SIZE > 0,
  IS_IN_BAG: (state, getters) => (icon) => !getters.GET_BAG_ICONS.includes(icon),
};

export const mutations = {
  ADD_TO_BAG(state, icon) {
    state.icons.push(icon);
  },
};

export const actions = {
  REMOVE_FROM_BAG({ commit, getters, state }, icon) {
    return new Promise((resolve) => {
      if (!icon) {
        if (getters.IS_USAGE_VISIBLE) commit('HIDE_USAGE');

        state.icons = [];
      } else {
        const index = state.icons.indexOf(icon);

        if (index > -1) {
          if (getters.IS_USAGE_VISIBLE && getters.GET_BAG_SIZE === 1) commit('HIDE_USAGE');

          state.icons.splice(index, 1);
        }
      }

      resolve();
    });
  },
  HIDE_BAG({ commit, dispatch }) {
    return new Promise((resolve) => {
      commit('HIDE_USAGE');
      dispatch('REMOVE_FROM_BAG');

      resolve();
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
