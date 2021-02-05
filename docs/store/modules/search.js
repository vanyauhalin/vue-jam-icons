export const state = {
  current: undefined,
};

export const getters = {
  GET_SEARCH: () => state.current,
};

export const mutations = {
  SET_SEARCH(state, content) {
    if (content) {
      state.current = content;
    } else {
      state.current = undefined;
    }
  },
};

export default {
  state,
  getters,
  mutations,
};
