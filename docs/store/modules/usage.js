import { Mount } from '@/data/code';

const html = document.getElementsByTagName('html')[0];

export const state = {
  icons: [],
  contents: [{
    name: 'Global mount',
    code: (icons, width) => Mount.global.certain(icons, width),
  }, {
    name: 'Local mount',
    code: (icons, width) => Mount.local.certain(icons, width),
  }],
  current: {},
  display: false,
};

export const getters = {
  GET_USAGE_ICONS: (state) => state.icons,
  GET_USAGE_CONTENTS: (state) => state.contents,
  GET_CURRENT_USAGE: (state) => state.current,
  GET_CURRENT_USAGE_CODE: (state, getters) => {
    const { code } = getters.GET_CURRENT_USAGE;
    const icons = getters.GET_USAGE_ICONS;
    const sizes = {
      main: getters.GET_MAIN_SIZE.name,
      current: getters.GET_CURRENT_SIZE.name,
    };

    return sizes.main === sizes.current ? code(icons) : code(icons, sizes.current);
  },
  IS_USAGE_VISIBLE: (state) => state.display,
};

export const mutations = {
  SET_USAGE_CONTENT(state, content) {
    state.current = content;
  },
  SHOW_USAGE(state, icons) {
    html.classList.add('is-covered');

    if (Array.isArray(icons)) {
      state.icons = icons;
    } else {
      state.icons.push(icons);
    }

    state.display = true;
  },
  HIDE_USAGE(state) {
    state.icons = [];
    state.display = false;

    html.classList.remove('is-covered');
  },
};

export const actions = {
  async CHANGE_USAGE_DISPLAY({ getters, commit }, icons) {
    return new Promise((resolve) => {
      if (getters.IS_USAGE_VISIBLE) {
        commit('HIDE_USAGE');
      } else {
        commit('SHOW_USAGE', icons);
      }

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
